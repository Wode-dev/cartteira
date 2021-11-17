// Initializes the `wallets` service on path `/wallets`
const { Wallets } = require('./wallets.class');
const createModel = require('../../../models/wallets.model');
const hooks = require('./wallets.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/wallets', new Wallets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/wallets');

  service.hooks(hooks);
};
