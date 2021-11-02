const categories = require('./categories/categories.service')
const wallets = require('./wallets/wallets.service')
const recurrences = require('./recurrences/recurrences.service')
const walletEntries = require('./wallet-entries/wallet-entries.service')

module.exports = function (app) {
  app.configure(wallets);
  app.configure(categories);
  app.configure(recurrences);
  app.configure(walletEntries);
};
