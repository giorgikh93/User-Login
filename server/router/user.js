const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: false }));
const User = require('../models/User')
const bcrypt = require('bcrypt')

const cookie = require('cookies')
const cookieParser = require('cookie-parser')
const session = require('express-session')
router.use(cookieParser())
router.use(session({
    secret: 'user',
    resave: true,
    saveUninitialized: true,
    cookie: ({ maxAge: 10000000 })
}))



const users = new User()


router.route('/register').post(async (req, res) => {
    let usr = users.getUser(req.body.email)
        if(usr !== 'Unknown user'){
            res.send('User already exists')
        }else{
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user = { ...req.body, password: hashedPassword }
                users.addUser(user)
            } catch{
                res.status(201).send(s)
            }
            res.send('success').status(200)
        }
})


router.route('/login').post(async (req, res) => {
    const user = users.getUser(req.body.email)
    if (user !== 'Unknown user') {
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user
                res.send(user).status(200)
            }else{
                res.send('Unknown user')
            }
        } catch{
            console.log('there is an error')
        }

    } else {
        res.send(user)
    }
})

router.route('/login').get((req, res) => {
    if (req.session.user) {
        res.send(req.session.user).status(200)
    } else {
        res.send('')
    }
})

router.route('/logout').post((req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})


router.route('/delete/:email').delete((req,res)=>{
    users.deleteUser(req.params.email)
    req.session.destroy()
    res.json('Your account deleted successfully').status(200)
})

module.exports = router