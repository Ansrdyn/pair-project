const { User, Post, Profile, sequelize } = require('../models')

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
    static getUser(req,res){
        User.findAll()
        .then((data) => {
            // res.send(data)
            res.render('tableUser', {data})
        }).catch((err) => {
            res.send(err)
        });
    }
    static getProfile (req,res){
        const id = req.params.id
        Profile.findOne({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Posts.id')), 'total']
                ]
            },
            include: {
                model: Post,
                attributes: []
            },
            where:{
                id
            },
            group: [['Profile.id', 'name', 'photoProfile', 'birthdate', 'bio']]
        })
        .then((data) => {
            // res.send(data)
            res.render('profilePost', {data})
        }).catch((err) => {
            res.send(err)
        });
    }
    static detailPost(req,res){
        const id = req.params.id
        Post.findOne({
            where:{
                id
            }
        })
        .then((data) => {
            res.render('showPost', {data})
        }).catch((err) => {
            res.err(err)
        });
    }
    static addPost(req,res){
        const profileId = req.params.profileId
        Profile.findOne({
            include: Post, 
            where:{
                id: profileId
            }
        })
        .then((data) => {
            // res.send(data)
            res.render('formAddPost', {data})
        }).catch((err) => {
            
        });
        // res.render('formAddPost')
    }
    static getAddPost (req,res){
        // const id = req.params.id
        const{name,content} = req.body
        const ProfileId = parseInt(req.body.ProfileId)
        const like = parseInt(req.body.like)
        Post.create({name,content,ProfileId, like})
        .then(() => {
            // console.log(req.body)
            res.redirect(`/profile/${ProfileId}`)
        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
    }
}


module.exports = UserController