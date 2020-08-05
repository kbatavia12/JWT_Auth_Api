const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
    const user = new User({
        username:  req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        console.log(user);
        if (err) {
            res.status(500).send({ msg: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles}
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({msg: err});
                }

                user.roles = roles.map(role => role._id)
                user.save(err => {
                    if (err) {
                        res.status(500).send({msg:err });
                        return;
                    }
                    res.send({msg: 'User was registered successfully'});
                });

            });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ msg:err });
                    return;
                }
                user.roles= [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({msg:err});
                        return;
                    }

                    res.send({msg: 'User was registered successfully!'});
                });
            });
        }
    });
}


exports.signIn = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({msg:err});
            return; 
        }

        if (!user) {
            return res.status(404).send({msg:'User not found'});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                msg: 'Invalid Password'
            });
        }

        let token = jwt.sign({id:user.id}, config.secret, {
            expiresIn: 86400
        });

        let authorities = [];

        user.roles.forEach(element => {
            authorities.push("ROLE_" + element.name.toUpperCase());
        })

        res.status(200).send({
            id:user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })

    })
}