/* eslint-disable no-unused-vars */

/**
 * @swagger
 * tags:
 *  - name: Categories
 *    description: Entry categories
 */

exports.Categories = class Categories {
  constructor(options) {
    this.options = options || {};
  }

  /**
   *  @swagger
   *  /v1/categories:
   *    get:
   *      tags: [Categories]
   *      summary: Retrieve possible categories
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: ok
   */
  async find(params) {
    return [
      "categories"
    ];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }
};
