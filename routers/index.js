const express = require('express')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController');
const router = express.Router()

// Home Page
// router.get('/', Controller.home)

// Login
router.get('/', UserController.renderLogin)
router.post('/', UserController.login)

// Register
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.register)

router.use((req, res, next) => {
    console.log(req.session);
    console.log('Time:', Date.now())
    next()
})

module.exports = router