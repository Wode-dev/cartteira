let { Wallet } = require("../../models");

module.exports = {
  index: async (req, res) => {
    let wallets = await Wallet.find();
    return res.json(wallets);
  },
  view: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    res.json(wallet);
  },
  create: async (req, res) => {
    let { body } = req;

    let wallet = new Wallet(body);
    let saved = await wallet.save();

    if (saved) {
      return res.json(wallet);
    }

    //
    return res.status(400).json();
  },
  update: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    let { body } = req;

    wallet.populate(body);
    let saved = await wallet.save();

    if (saved) return res.json(wallet);

    return res.status(400).json();
  },
  delete: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    let deleted = await wallet.delete();

    if (deleted) return res.json();

    return res.status(400).json();
  },
  entries: require("./walletEntries"),
};
