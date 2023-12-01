// app/middleware/verifySignUp.js

const db = require("../models");
const ROLES = db.ROLES;

const checkDuplicateUserNameOrEmail = (req, res, next) => {
  // Check duplicate userName
  db.user.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Check duplicate email
    db.user.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = async (req, res, next) => {
  try {
    const roles = req.body.roles;
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (!ROLES.includes(roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + roles[i]
          });
          return;
        }
      }  
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed when checking roles." });
  }
};

module.exports = {
  checkDuplicateUserNameOrEmail,
  checkRolesExisted,
};