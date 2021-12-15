/**
 * @swagger
 * tags:
 *  - name: Wallet
 *    description: Wallet for adding entries
 */
let { Wallet } = require("../../models");
let { Wallets } = require("../../core")

module.exports = {
  /**
   * @swagger
   * /v1/wallets:
   *  get:
   *    tags: [Wallet]
   *    summary: Retrieve all wallets
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - name: userId
   *        in: query
   *        required: false
   *        schema:
   *          type: string
   *    responses:
   *      '200':
   *        description: ok
   *      '401':
   *        description: Not enough permissions
   */
  index: async (req, res) => {
    let { query } = req;
    let { userId } = query;
    if (!userId) userId = req.user.id;
    // console.log({
    //   userId,
    //   limit: req.query.limit,
    //   skip: req.skip
    // });

    // Forbids not admin users from retrieving records from other users
    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let total = await Wallet.find({ userId }).countDocuments();
    let wallets = await Wallet.find({ userId }).limit(req.query.limit).skip(req.skip).lean();

    wallets.map((wallet) => {
      wallet["total"] = Wallets.entries.countEntriesTotal(wallet.entries);
      delete wallet.entries;

      return wallet;
    });

    return res.json({
      total,
      limit: req.query.limit,
      skip: req.skip,
      data: wallets
    });
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
   *      - name: userId
   *        in: query
   *        required: false
   *        schema:
   *          type: string
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   *      '401':
   *        description: Not enough permissions
   */
  view: async (req, res) => {
    let { userId } = req.query;
    if (!userId) userId = req.user.id;

    // Forbids not admin users from retrieving records from other users
    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let id = req.params.id;
    let wallet = await Wallet.find({ _id: id, userId });

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
   *      '401':
   *        description: Not enough permissions
   */
  create: async (req, res) => {
    let { body } = req;

    let wallet = new Wallet(body);
    let userId = req.user.id;

    if (!wallet.userId) wallet.userId = userId;

    // Forbids not admin users from retrieving records from other users
    if (userId != wallet.userId && !req.user.hasSysadminPermissions())
      return res.status(401).send();

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
   *    description: For updating wallets, you need sysadmin role
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
   *      '401':
   *        description: Not enough permissions
   */
  update: async (req, res) => {
    let id = req.params.id;
    let userId = req.user.id;
    let wallet = await Wallet.findById(id);

    // Forbids not admin users from retrieving records from other users
    if (userId != wallet.userId && !req.user.hasSysadminPermissions())
      return res.status(401).send();

    let { body } = req;

    let modified = await Wallet.updateOne({ _id: wallet._id }, { $set: body });
    // let saved = await wallet.save();

    if (modified.nModified > 0) return res.json(wallet);

    return res.status(400).json();
  },
  /**
   * @swagger
   * /v1/wallets/{id}:
   *  delete:
   *    tags: [Wallet]
   *    summary: Delete wallet
   *    description: You need sysadmin role to delete records from another user
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
   *      '401':
   *        description: Not enough permissions
   */
  delete: async (req, res) => {
    let id = req.params.id;
    let userId = req.user.id;

    let wallet = await Wallet.findById(id);

    console.log({ wallet });

    // Forbids not admin users from deleting records from other users
    if (!req.user.hasSysadminPermissions()) {
      if (!wallet.userId.equals(userId)) {
        console.log({
          wallet_userid: wallet.userId,
          userId,
          sysad: req.user.hasSysadminPermissions(),
        });
        return res.status(401).send();
      }
    }

    let deleted = await wallet.delete();
    if (deleted) return res.json();

    return res.status(400).json();
  },
  entries: require("./walletEntries"),
};
