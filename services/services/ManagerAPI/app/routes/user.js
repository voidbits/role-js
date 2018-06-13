const passport = require('passport'),
  config = require('@config'),
  models = require('@Manager/app/setup');

module.exports = (app) => {
  const api = app.ManagerAPI.app.api.user;

  app.route('/api/v1/signup')
    .post(api.signup(models.User));

    // Only allow the admin role to delete.
  app.route('/api/v1/user')
    .delete(app.get('acl')(['admin'], passport, config), api.remove(models.User, app.get('key')))

    //Only allow the admin role to list users.
  app.route('/api/v1/users')
    .get(app.get('acl')(['admin'], passport, config), api.users(models.User, app.get('key')))

}