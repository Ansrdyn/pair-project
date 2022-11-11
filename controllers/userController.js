const { User, Post, Profile, sequelize } = require('../models')
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');

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
        const id = req.params.id
        console.log(req.session);
        const userId = req.session.UserId
        // const id = req.params.id
        Profile.findOne({
            include: {
                model: Post
            },
            where: {
                UserId: id
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
        Profile.findOne({
            include: Post,
            where: {
                UserId: id
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('showPost', { data })
            }).catch((err) => {
                res.err(err)
            });
    }
    
    static addPost(req, res) {
        const profileId = req.params.profileId
        const errors = req.query.errors
        Profile.findOne({
            include: Post,
            where: {
                id: profileId
            }
        })
            .then((data) => {
                res.render('formAddPost', { data, errors })
            }).catch((err) => {
                res.send(err)
            });
    }

    static getAddPost(req, res) {
        // const id = req.params.id
        const profileId = req.params.profileId
        const { name, content } = req.body
        Post.create({ name, content, ProfileId: profileId })
            .then(() => {
                res.redirect(`/profile/${profileId}`)
            }).catch((err) => {
                // if (err.name == `SequelizeValidationError`) {
                let errors = err.errors.map(el => el.message)
                if (errors) {
                    res.redirect(`/profile/${profileId}/addPost?errors=${errors}`)
                } else {
                    res.send(err)
                }
            });
    }

    static editProfile(req, res) {
        const errors = req.query.errors
        const profileId = req.params.profileId
        Profile.findOne({
            include: Post,
            where: {
                id: profileId
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('formEditProfil', { data, errors })
            }).catch((err) => {
                res.send(err)
            });
        // res.render('formAddPost')
    }

    static postEditProfile(req, res) {
        const profileId = req.params.profileId
        const { name, photoProfile, birtdate, bio, UserId } = req.body
        // const like = parseInt(req.body.like)
        Profile.update({ name, photoProfile, birtdate, bio, UserId }, {
            where: {
                id: profileId
            }
        })
            .then(() => {
                res.redirect(`/profile/${profileId}`)
            }).catch((err) => {
                if (err.name == `SequelizeValidationError`) {
                    let errors = err.errors.map(el => el.message)
                    res.redirect(`/editProfile/${profileId}?errors=${errors}`)
                } else {
                    res.send(err)
                }
            });
    }
    static deletePost(req, res) {
        const { id, postId } = req.params
        Post.destroy({
            where: {
                id: postId
            }
        })
            .then(() => {
                console.log('haloo')
                res.redirect(`/detailPost/${id}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static like(req, respond) {
        const id = req.params.id
        Post.findOne({
            where: {
                id
            }
        }).then((data) => {
            Post.update({
                like: data.like + 1
            }, {
                where: {
                    id
                }
            })
            // console.log(data);
        })
            .then(() => res.redirect(`/profile/${id}`))
            .catch(err => res.send(err))
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