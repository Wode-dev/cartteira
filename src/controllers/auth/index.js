/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

/**
 * @swagger
 *  tags:
 *    - name: Auth
 *      description: Authentication for receiving JWT token
 */

const passport = require("passport");
const jwtHelper = require("../../core/jwtHelper");
const { User } = require("../../models");

module.exports = {
  /**
   * @swagger
   *  /auth/register:
   *    post:
   *      tags: [Auth]
   *      summary: register new user
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              properties:
   *                username:
   *                  type: string
   *                password:
   *                  type: string
   *              required:
   *                - username
   *                - password
   *      responses:
   *        '200':
   *          description: ok
   */
  register: async (req, res) => {
    let { username, password, fullName } = req.body;

    let createdUser = await User.create({ username, password, fullName });

    if (createdUser) {
      return res.json({ createdUser });
    }

    return res.json({ message: "It wasn't possible to register" });
  },
  renewToken: (req, res) => {},
  /**
   * @swagger
   *  /auth/token:
   *    post:
   *      tags: [Auth]
   *      summary: Request authentication JWT
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              properties:
   *                username:
   *                  type: string
   *                password:
   *                  type: string
   *              required:
   *                - username
   *                - password
   *      responses:
   *        '200':
   *          description: ok
   */
  token: async (req, res) => {
    let { username, password } = req.body;

    let user = await User.findOne({ username });
    let valid = user.validPassword(password);

    if (valid) {
      let token = jwtHelper.createToken({ userId: user.id });
      return res.json({ token });
    }

    return res.json({ message: "It wasn't possible to authenticate" });
  },
};
