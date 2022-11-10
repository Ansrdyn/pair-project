const { User } = require('../models')

class UserController {

    static renderRegister(req, res) {
        res.render('register')
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
}

module.exports = UserController