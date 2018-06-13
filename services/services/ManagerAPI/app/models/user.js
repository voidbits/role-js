const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  middleName: {
    type: String
  },

  email: {
    type: String
  },

  phone: {
    type: String
  },

  role: {
    type: String
  }
});

// Prevent the password hash from getting out, only serialize everything else besides the password for now.
Schema.set('toJSON', {
  transform: function (doc, ret, options) {
    var retJson = {
      _id: ret._id,
      username: ret.username,
      firstName: ret.firstName,
      lastName: ret.lastName,
      middleName: ret.middleName,
      email: ret.email,
      phone: ret.phone,
      role: ret.role
    };
    return retJson
  }
})

// We won't use arrow functions here because of automatic lexical scope binding
Schema.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);

        user.password = hash;
        next();
      });
    });
  } else return next();
});

Schema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error);
    callback(null, matches);
  });
};

mongoose.model('User', Schema);