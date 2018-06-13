const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      consign = require('consign'),
      cors = require('cors'),
      passport = require('passport'),
      passportConfig = require('./passport')(passport),
      jwt = require('jsonwebtoken'),
      config = require('./index.js'),
      database = require('./database')(mongoose, config);

var acl = require('acl');
acl = new acl(new acl.mongodbBackend(mongoose.connection, null));

app.use(express.static('.'));
app.use(bodyParser.urlencoded({
      extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('key', config.secret);

function checkRole(roles, passport, config) {
      return function (req, res, next) {
            passport.authenticate('jwt', config.session, function (err, user, info) {
                  if (err) {
                        res.status(403).send('Forbidden')
                  } else if (!user) {
                        res.status(403).send('Forbidden')
                  } else {
                        if (roles.includes(user.role)) {
                              next()
                        } else
                              res.status(403).send('Forbidden')
                  }
            })(req, res, next)
      }
}

app.set('acl', checkRole);

consign({
            cwd: 'services'
      })
      .include('ManagerAPI/app/setup')
      .then('ManagerAPI/app/api')
      .then('ManagerAPI/app/routes')
      .into(app);

module.exports = app;