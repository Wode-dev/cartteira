const { Service } = require('feathers-mongoose');
const { paginate } = require('./../../../core');

const { NotFound } = require('@feathersjs/errors');

function sanitize(entry) {
  if (typeof entry.value == 'string') {
    entry.value = Number.parseFloat(entry.value);
  }

  return entry;
};

exports.WalletEntries = class WalletEntries extends Service {
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
  async find(params) {
    let { query } = params;
    let entries = params.wallet.entries;

    let t = await params.models.wallet.find(
      { "_id": params.route.walletId, "entries": { $elemMatch: query } },
      { "entries": { $elemMatch: query } }
    ).exec();

    console.log({ query,  t: t[0].entries, tcount: t[0].entries.length });

    let total = parseInt(params.wallet.entries.length);
    let limit = parseInt(query.$limit) || this.options.paginate.default;
    let skip = parseInt(query.$skip) || 0;
    if (limit > total && limit < this.options.paginate.max) {
      limit = this.options.paginate.max;
    }

    entries = entries.splice(skip, limit);

    return paginate(entries, total, limit, skip);
  }
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
  async get(id, params) {
    let entry = params.wallet.get('entries').filter(entry => entry._id == id)[0];

    return entry;
  }
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
  async create(data, params) {
    let { wallet } = params;

    let entries = wallet.get('entries');
    let entry = new this.Model(data)
    entries.push(entry);

    wallet.set('entries', entries);
    await wallet.save();

    return entry;
  }
  /**
   * @swagger
   * /v1/wallets/{walletId}/entries/{id}:
   *  patch:
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
  async patch(id, data, params) {
    // let { id, walletId } = req.params;
    // let wallet = await Wallet.findById(walletId);

    // if (wallet.userId != req.user.id && !req.user.hasSysadminPermissions())
    //   return res.status(401).send();

    // let { body } = req;

    // body = sanitize(body);

    // let entry = await wallet.entries.id(id);
    // entry.overwrite(body);

    // let saved = await wallet.save();

    // if (saved) return res.json(entry);

    // return res.status(400).json();

    let { wallet } = params;
    let entries = wallet.get('entries');
    let index = entries.findIndex(entry => entry._id == id);

    console.log({ index, id });

    if (index > 0) {
      entries[index].set(data);
      wallet.set('entries', entries);

      await wallet.save();

      return entries[index];
    } else {
      new NotFound();
    }


  }
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
  async update(id, data, params) {
    let { wallet } = params;
    let entries = wallet.get('entries');
    let index = entries.findIndex(entry => entry._id == id);

    console.log({ index, id });

    if (index > 0) {
      entries[index].overwrite(data);
      wallet.set('entries', entries);

      await wallet.save();

      return entries[index];
    } else {
      new NotFound();
    }
  }
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
  async remove(id, params) {
    let { wallet } = params;
    let entries = wallet.get('entries');
    let index = entries.findIndex(entry => entry._id == id);
    if (index > 0) {
      entries.splice(index, 1);

      wallet.set('entries', entries);
      await wallet.save();
    }

    new NotFound();
  }
};
