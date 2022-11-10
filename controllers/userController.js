const { User } = require('../models')
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
        let { userName, password, email, role } = req.body
        User.create({
            userName,
            password,
            email,
            role
        })
            .then((result) => {
                res.redirect('/')
            }).catch((err) => {
                console.log(err);
                res.send(err)
            });
    }

    static login(req, res) {
        const { userName, password } = req.body
        User.findOne({ where: { userName } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcryptjs.compareSync(password, user.password)
                    if (isValidPassword) {

                        req.session.role = user.role

                        return res.redirect('/addProfile')
                    } else {
                        const error = 'Invalid username/password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            }).catch((err) => {

            });
    }

}

module.exports = UserController