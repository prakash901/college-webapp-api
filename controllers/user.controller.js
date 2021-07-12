const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists!",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              fullname: req.body.name,
              email: req.body.email,
              password: hash,
            };

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  post: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong, cannot create user!",
                  error: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    });
}

function Login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user == null) {
        res.status(401).json({
          message: "Invalid credentials!",
          error: error,
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              //password matched so generate an access token for user
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  console.log("token  is", token);
                  res.status(200).json({
                    message: " Authentication successful!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid credentials!",
                error: err,
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrongggg!",
        error: error,
      });
    });
}

module.exports = {
  signUp: signUp,
  Login: Login,
};
