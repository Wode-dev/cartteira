const users = require('./users/users.service.js');
const v1 = require('./v1');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(v1);
};
