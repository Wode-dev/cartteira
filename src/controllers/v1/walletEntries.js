let { Wallet } = require("../../models");

module.exports = {
  index: async (req, res) => {
    let { walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let entries = wallet.entries;

    return res.json(entries);
  },
  view: async (req, res) => {
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let entry = wallet.entries.findById(id);

    return res.json(entry);
  },
  create: async (req, res) => {
    let { body } = req;
    let { id, walletId } = req.params;

    let wallet = await Wallet.findById(walletId);
    await wallet.entries.push(body);

    let saved = wallet.save();

    if (saved) {
      return res.json(body);
    }

    //
    return res.status(400).json();
  },
  update: async (req, res) => {
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let { body } = req;

    let entry = await wallet.entries.findById(id);
    entry.populate(body);

    let saved = await wallet.save();

    if (saved) return res.json(entry);

    return res.status(400).json();
  },
  delete: async (req, res) => {
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let entry = await wallet.entries.findById(id);
    await entry.remove();
    let deleted = wallet.save();

    if (deleted) return res.json();

    return res.status(400).json();
  },
};
