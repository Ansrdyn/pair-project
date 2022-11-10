const express = require('express')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController');
const router = express.Router()

// Home Page
// router.get('/', Controller.home)

// Login
router.get('/login', UserController.renderLogin)
router.post('/login', UserController.login)

// Register
router.get('/register', UserController.renderRegister)
router.post('/register', UserController.register)

router.use((req, res, next) => {

    if (req.session.role === 'admin') {
        res.redirect('/user')
    } else {
        next()
    }
    // if (!req.session.role) {
    //     res.redirect('/')
    // } else {
    //     next()
    // }
})

router.get('/', UserController.HomePage)

router.get('/addPost', UserController.addPost)

// table user
router.get('/user', UserController.getUser)

// table profile + jumlah post


// read post

router.get('/profile/:id', UserController.getProfile)
router.get('/detailPost/:id', UserController.detailPost)

// add post(get)

// add post(post)
router.post('/profile/:profileId/addPost', UserController.getAddPost)

// edit profil
router.get('/editProfile/:profileId', UserController.editProfile)

// post edit profile
router.post('/editProfile/:profileId', UserController.postEditProfile)

// deleteId
router.get('profile/:profileId/delete/:postId', UserController.deletePost)


router.use((req, res, next) => {
    console.log(req.session);
    console.log('Time:', Date.now())
    next()
})

module.exports = router