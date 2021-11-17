// const { authenticate } = require('@feathersjs/authentication').hooks;
const Wallet = require('./../../../models/wallets.model.js');

module.exports = {
  before: {
    all: [
      async (context) => {
        let walletModel = Wallet(context.app);
        let wallet = await walletModel.findById(context.params.route.walletId);
        // console.log({walletModel, wallet});

        context.params.wallet = wallet;
        context.params.models = {
          wallet: walletModel
        };

        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
