/**
 * @swagger
 * tags:
 *  - name: Wallet
 *    description: Wallet for adding entries
 */
let { Wallet } = require("../../models");

module.exports = {
  /**
   * @swagger
   * /v1/wallets:
   *  get:
   *    tags: [Wallet]
   *    summary: Retrieve all wallets
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  index: async (req, res) => {
    let wallets = await Wallet.find();
    return res.json(wallets);
  },
  /**
   * @swagger
   * /v1/wallets/{id}:
   *  get:
   *    tags: [Wallet]
   *    summary: Retrieve especific wallet
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  view: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    res.json(wallet);
  },
  /**
   * @swagger
   * /v1/wallets:
   *  post:
   *    tags: [Wallet]
   *    summary: Create wallet
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Wallet'
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
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
  /**
   * @swagger
   * /v1/wallets/{id}:
   *  put:
   *    tags: [Wallet]
   *    summary: Update wallet
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Wallet'
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  update: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    let { body } = req;

    wallet.populate(body);
    let saved = await wallet.save();

    if (saved) return res.json(wallet);

    return res.status(400).json();
  },
  /**
   * @swagger
   * /v1/wallets/{id}:
   *  delete:
   *    tags: [Wallet]
   *    summary: Delete wallet
   *    parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  delete: async (req, res) => {
    let id = req.params.id;
    let wallet = await Wallet.findById(id);

    let deleted = await wallet.delete();

    if (deleted) return res.json();

    return res.status(400).json();
  },
  entries: require("./walletEntries"),
};
