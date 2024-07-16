const express = require('express')
const UserControllher = require('../controllers/UserController')
const router = express.Router()


//User Controller
router.get('/getalluser',UserControllher.getAllUser)
router.post('/userinsert',UserControllher.userInsert)










module.exports=router