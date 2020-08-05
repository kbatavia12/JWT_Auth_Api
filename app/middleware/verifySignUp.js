//Check duplicates for credentials!
//Check if roles are legal or not!



const db = require("../models");
const { ROLES } = require("../models");
const Roles = db.ROLES;
const User = db.user;

const checkDuplicateCredentails = (req, res, next) => {
  //Check for Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res
        .status(400)
        .send({ message: "Failed! Username is taken by another account" });
      return;
    }

    //Check for Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res
          .status(400)
          .send({ message: "Failed! Email is taken by another account" });
        return;
      }
      next();
    });
  });
};


const checkRolesExisted = (req, res, next) => {
    req.body.roles.forEach(element => {
        if (!ROLES.includes(element)) {
            res.status(400).send({ message: `Failed! ${element} does not exist` })
            return;
        }
    })

    next();
}

const verifySignUp = {
    checkDuplicateCredentails,
    checkRolesExisted
}


module.exports = verifySignUp;