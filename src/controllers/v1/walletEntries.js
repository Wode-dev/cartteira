let { Wallet } = require("../../models");

function sanitize(entry) {
  if (typeof entry.value == "string") {
    entry.value = Number.parseFloat(entry.value);
  }

  return entry;
}

module.exports = {
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries:
   *  get:
   *    tags: [Wallet]
   *    summary: Get all entries from a wallet
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *      - name: start_date
   *        in: query
   *        required: false
   *        schema:
   *          type: date
   *      - name: end_date
   *        in: query
   *        required: false
   *        schema:
   *          type: date
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  index: async (req, res) => {
    let { walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    if (wallet.userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let entries = wallet.entries;

    return res.json(entries);
  },
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries/{id}:
   *  get:
   *    tags: [Wallet]
   *    summary: Get one especific entry from a wallet
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
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
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    if (wallet.userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let entry = wallet.entries.findById(id);

    return res.json(entry);
  },
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries:
   *  post:
   *    tags: [Wallet]
   *    summary: Create entry to a wallet
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Entry'
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  create: async (req, res) => {
    let { body } = req;
    let { id, walletId } = req.params;

    body = sanitize(body);

    let wallet = await Wallet.findById(walletId);
    await wallet.entries.push(body);

    if (wallet.userId != req.user.id && !req.user.hasSysadminPermissions())
      return res.status(401).send();

    let saved = wallet.save();

    if (saved) {
      return res.json(body);
    }

    return res.status(400).json();
  },
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries/{id}:
   *  put:
   *    tags: [Wallet]
   *    summary: Update entry from wallet
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
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
  update: async (req, res) => {
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    if (wallet.userId != req.user.id && !req.user.hasSysadminPermissions())
      return res.status(401).send();

    let { body } = req;

    body = sanitize(body);

    let entry = await wallet.entries.id(id);
    entry.overwrite(body);

    let saved = await wallet.save();

    if (saved) return res.json(entry);

    return res.status(400).json();
  },
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries/{id}:
   *  delete:
   *    tags: [Wallet]
   *    summary: Delete entry from wallet
   *    parameters:
   *      - name: walletId
   *        in: path
   *        required: true
   *        schema:
   *          type: string
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
    let { id, walletId } = req.params;
    let wallet = await Wallet.findById(walletId);

    console.log({
      params: {
        walletUserId: wallet.userId,
        requserid: req.user.id,
        sysadmin: req.user.hasSysadminPermissions()
      },
      cond: wallet.userId != req.user.id && !req.user.hasSysadminPermissions()
    });

    if (wallet.userId != req.user.id && !req.user.hasSysadminPermissions()) return res.status(401).send();

    let entry = await wallet.entries.id(id);
    await entry.remove();
    let deleted = wallet.save();

    if (deleted) return res.json();

    return res.status(400).json();
  },
};
