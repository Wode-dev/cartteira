const resourceController = require("../contracts/resourceContract");
const { Recurrence } = require("../../models");

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
    return resourceController.index(req, res, { Model: Recurrence });
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
    return resourceController.view(req, res, {
      Model: Recurrence,
      id: req.params.id,
    });
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
    return resourceController.create(req, res, {
      Model: Recurrence,
      data: req.body,
    });
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
    return resourceController.update(req, res, {
      Model: Recurrence,
      id: req.params.id,
      data: req.body,
    });
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
    return resourceController.delete(req, res, {
      Model: Recurrence,
      id: req.params.id,
    });
  },
};
