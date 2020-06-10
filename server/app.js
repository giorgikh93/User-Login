const express = require('express')
const path = require('path')
const user = require('./router/user')
const app = express()
const cors = require('cors')
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())


app.use(user)



app.listen(5000)