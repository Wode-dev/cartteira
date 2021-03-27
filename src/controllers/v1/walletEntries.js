let { Wallet } = require("../../models");

module.exports = {
  /**
   * @swagger
   * /wallets/{walletId}/entries:
   *  get:
   *    tags: [Wallet]
   *    summary: Get all wallets
   *    description: Show all wallets
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   */
  index: async (req, res) => {
    let { walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let entries = wallet.entries;

    return res.json(entries);
  },
  /**
   * @swagger
   * /wallets/{walletId}/entries/{id}:
   *  get:
   *    tags: [Wallet]
   *    summary: Get all wallets
   *    description: Show all wallets
   */
  view: async (req, res) => {
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    let entry = wallet.entries.findById(id);

    return res.json(entry);
  },
  /**
   * @swagger
   * /wallets/{walletId}/entries:
   *  post:
   *    tags: [Wallet]
   *    summary: Get all wallets
   *    description: Show all wallets
   */
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
  /**
   * @swagger
   * /wallets/{walletId}/entries/{id}:
   *  put:
   *    tags: [Wallet]
   *    summary: Get all wallets
   *    description: Show all wallets
   */
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
  /**
   * @swagger
   * /wallets/{walletId}/entries/{id}:
   *  delete:
   *    tags: [Wallet]
   *    summary: Get all wallets
   *    description: Show all wallets
   */
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
