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
    cookie: ({ maxAge: 60000000 * 20 })
}))

const multer = require('multer');
const e = require('express');

const imageName = Date.now() + '-';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pictures')
    },

    filename: function (req, file, cb) {
        cb(null, imageName + file.originalname)
    }
});


const upload = multer({ storage: storage }).single('image')

const users = new User()

router.route('/upload').post((req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        if (req.file !== undefined) {
            const file = req.file
            const email = req.body.user
            const user = users.getUser(email)
            users.addFile(file.filename, user)
            req.session.user = user;
            res.send(user.album)
        } else {
            return
        }

    })
})

router.route('/upload/:email').get((req, res) => {
    const email = req.params.email

    const usr = users.getUser(email)

    req.session.album = usr
    res.send(usr.album)

})  

router.route('/register').post(async (req, res) => {
    let usr = users.getUser(req.body.email)
    if (usr !== 'Unknown user') {
        res.send('User already exists')
    } else {
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
            } else {
                res.send('Unknown user')
            }
        } catch{
            console.log('there is an error')
        }

    } else {
        res.send(user)
    }
})


router.route('/like/').post((req,res)=>{

    const usr = users.getUser(req.body.email)
    users.addLikes(usr,req.body.img)

    let user = users.getUser(usr.email)
    req.session.album =user
    res.send(user.album)
})

router.route('/search').get((req,res)=>{
    const email = req.query.email.toLowerCase()
    const userList = users.getAllUser()
    let usr;
    for(let i of userList){
        if(i.email.toLowerCase().indexOf(email) !== false){
               usr = i.email
        }
    }
    res.send(usr)
})

router.route('/deleteImg').delete((req,res)=>{
    const user = req.body.user;
    const img = req.body.img;
    users.deleteFile(user,img)
    let usr = users.getUser(user.email)
    res.send(usr.album)
})

router.route('/login').get((req, res) => {
    if (req.session.user) {
        res.send(req.session.user).status(200)
    } else {
        res.send(false)
    }
})

router.route('/logout').post((req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})


router.route('/delete/:email').delete((req, res) => {
    users.deleteUser(req.params.email)
    req.session.destroy()
    res.json('Your account deleted successfully').status(200)
})

module.exports = router