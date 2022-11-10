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

// table user
router.get('/User', UserController.getUser)

// table profile + jumlah post
router.get('/profile/:id', UserController.getProfile)

// read post
router.get('/detailPost/:id', UserController.detailPost)

// add post(get)
router.get('/profile/:profileId/addPost', UserController.addPost)

// add post(post)
router.post('/profile/:profileId/addPost', UserController.getAddPost) // masih salah



router.use((req, res, next) => {
    console.log(req.session);
    console.log('Time:', Date.now())
    next()
})

module.exports = router