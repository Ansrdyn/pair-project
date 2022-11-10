const express = require('express')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController');
const router = express.Router()

// Home Page
router.get('/', Controller.home)

// Register
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.register)



module.exports = router