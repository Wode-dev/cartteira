// Initializes the `walletEntries` service on path `/v1/wallets/:walletId/entries`
const { WalletEntries } = require('./wallet-entries.class');
const createModel = require('../../../models/wallet-entries.model');
const hooks = require('./wallet-entries.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/wallets/:walletId/entries', new WalletEntries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/wallets/:walletId/entries');

  service.hooks(hooks);
};
