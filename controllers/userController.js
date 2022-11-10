const { User, Post, Profile, sequelize } = require('../models')
const bcryptjs = require('bcryptjs');

class UserController {

    static renderRegister(req, res) {
        res.render('register')
    }

    static renderLogin(req, res) {
        let { error } = req.query
        res.render('loginForm', { error })
    }

    static register(req, res) {
        let { name, birthdate, bio, userName, password, email } = req.body
        User.create({
            userName,
            password,
            email,
        })
            .then((result) => {
                Profile.create({
                    name,
                    birthdate,
                    bio,
                    UserId: result.id
                })
            }).then((result) => {
                res.redirect('/')
            }).catch((err) => {
                res.send(err)
            });
    }

    static getUser(req, res) {
        User.findAll()
            .then((data) => {
                res.render('tableUser', { data })
            }).catch((err) => {
                res.send(err)
            });
    }

    static getProfile(req, res) {
        const userId = req.session.UserId
        // const id = req.params.id
        Profile.findOne({
            include: {
                model: Post
            },
            where: {
                UserId: userId
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('profilePost', { data })
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static detailPost(req, res) {
        const id = req.params.id
        console.log(req.params.id);
        Post.findOne({
            where: {
                id
            }
        })
            .then((data) => {
                res.render('showPost', { data })
            }).catch((err) => {
                res.err(err)
            });
    }

    static addPost(req, res) {
        const profileId = req.params.profileId
        Profile.findOne({
            include: Post,
            where: {
                id: profileId
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('formAddPost', { data })
            }).catch((err) => {

            });
        // res.render('formAddPost')
    }

    static getAddPost(req, res) {
        const { name, content } = req.body
        const ProfileId = parseInt(req.body.ProfileId)
        const like = parseInt(req.body.like)
        Post.create({ name, content, ProfileId, like })
            .then(() => {
                // console.log(req.body)
                res.redirect(`/profile/${ProfileId}`)
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static login(req, res) {
        const { userName, password } = req.body
        User.findOne({
            where: { userName }
        })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcryptjs.compareSync(password, user.password)
                    if (isValidPassword) {

                        req.session.role = user.role
                        req.session.UserId = user.id

                        return res.redirect('/profile')
                    } else {
                        const error = 'Invalid username/password'
                        return res.redirect(`/?error=${error}`)
                    }
                } else {
                    const error = 'Invalid username/password'
                    return res.redirect(`/?error=${error}`)
                }
            }).catch((err) => {
                console.log(err);
                res.send(err)
            })
    }

}






module.exports = UserController