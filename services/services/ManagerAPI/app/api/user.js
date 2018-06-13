const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: 'Please, pass a username and password.'
    });
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: "demo",
      lastName: "account",
      middleName: req.body.middleName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role
    });

    user.save(error => {
      if (error) return res.status(400).json({
        success: false,
        message: 'Username already exists.'
      });
      res.json({
        success: true,
        message: 'Account created successfully'
      });
    });
  }
}

api.remove = (User, Token) => (req, res) => {
  if (Token) {
    User.remove({
      _id: req.query._id
    }, (error, removed) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(200).json({
        success: true,
        message: 'Removed successfully'
      });
    })
  } else return res.status(401).send({
    success: false,
    message: 'Unauthorized'
  });
}

api.users = (User, Token) => (req, res) => {
  if (Token) {
    User.find({}, (error, user) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json(user);
      return true;
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized'
    });
  }
}

module.exports = api;