const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: false }));
const Registration = require('../models/Registration')

const registration = new Registration()


router.route('/register').post((req,res)=>{

    registration.addUser(req.body)
    res.send('success').status(200)
})


router.route('/login').post((req,res)=>{
   const user = registration.getUser(req.body.email,req.body.password)
    res.send(user).status(200)
})


module.exports = router