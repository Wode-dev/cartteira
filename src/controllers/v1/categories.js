/**
 * @swagger
 * tags:
 *  - name: Categories
 *    description: Entry categories
 */

const categories = require('../../core/defaultCategories');

module.exports = {
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
  index: (req, res) => {
    return res.json(categories);
  },
};
