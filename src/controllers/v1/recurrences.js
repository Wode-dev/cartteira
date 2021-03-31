const resourceController = require("../contracts/resourceContract");
const { Recurrence, UserData } = require("../../models");

/**
 * @swagger
 * tags:
 *  - name: Recurrences
 *    description: Recurrent entries
 */
module.exports = {
  /**
   *  @swagger
   *  /v1/recurrences:
   *    get:
   *      tags: [Recurrences]
   *      summary: Retrieve all recurrence entries for user
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: ok
   */
  index: async (req, res) => {
    let { userId } = req.query;
    if (!userId) userId = req.user.id;

    let userData = await UserData.findOne({ userId });

    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let recurrences = userData ? userData.recurrences : [];
    return res.json(recurrences);
  },
  /**
   *  @swagger
   *  /v1/recurrences/{id}:
   *    get:
   *      tags: [Recurrences]
   *      summary: Retrieve especific recurrence
   *      parameters:
   *        - name: id
   *          in: path
   *          required: true
   *          schema:
   *            type: string
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: ok
   */
  view: async (req, res) => {
    let { id } = req.params;
    let { userId } = req.query;
    if (!userId) userId = req.user.id;

    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let userData = await UserData.findOne({ userId });
    let recurrence = {};
    if (userData) {
      recurrence = await userData.recurrences.findById(id);
    }

    return res.json(recurrence);
  },
  /**
   * @swagger
   * /v1/recurrences:
   *  post:
   *    tags: [Recurrences]
   *    summary: Create recurrence
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Recurrence'
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  create: async (req, res) => {
    let { userId } = req.query;
    if (!userId) userId = req.user.id;

    let recurrence = new Recurrence(req.body);

    if (userId != req.user.id && !req.user.hasSysadminPermissions())
      return res.status(401).send();

    let userData = await UserData.findOne({ userId });
    if (!userData) {
      userData = await UserData.create({ userId });
    }
    userData.recurrences.push(recurrence);

    let saved = userData.save();
    if (saved) {
      return res.json(recurrence);
    }

    return res.status(400).json();
  },
  /**
   * @swagger
   * /v1/recurrences/{id}:
   *  put:
   *    tags: [Recurrences]
   *    summary: Update recurrence
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
   *            $ref: '#/components/schemas/Recurrence'
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: ok
   */
  update: async (req, res) => {
    let { userId } = req.body;
    if (!userId) userId = req.user.id;

    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let userData = await UserData.findOne({ userId });
    if (!userData) {
      return res.status(400).send();
    }
    recurrence = await userData.recurrences.findById(id);
    if (!recurrence) {
      return res.status(400).send();
    }

    recurrence.overwrite(req.body);
    let saved = userData.save();
    if (saved) return res.json(recurrence);

    return res.status(400).send();
  },
  /**
   * @swagger
   * /v1/recurrences/{id}:
   *  delete:
   *    tags: [Recurrences]
   *    summary: Delete recurrence
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
    let { id } = req.params;
    let { userId } = req.query;
    if (!userId) userId = req.user.id;

    if (userId != req.user.id && !req.user.hasAdminPermissions())
      return res.status(401).send();

    let userData = await UserData.findOne({ userId });
    let recurrence = {};
    if (!userData) return res.status(400).send();

    recurrence = await userData.recurrences.findById(id);
    if (!recurrence) return res.status(400).send();

    userData.recurrences.pull(recurrence);
    let saved = await userData.save();
    if (saved) return res.status(201).send();

    return res.json(recurrence);
  },
};
