const mongoose = require('mongoose'),
      UserModel = require('@ManagerModels/user') 

const models = {
  User: mongoose.model('User')  
}

module.exports = models;
