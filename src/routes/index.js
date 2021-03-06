const express = require("express");
const routes = express.Router();
const middlewares = require("../middlewares");

/**================================================================================
 *                                     ROUTES
 * =============================================================================**/
const apiV1Routes = require("./v1");
routes.use("/v1", apiV1Routes);

const apiAuth = require("./auth");
routes.use("/auth", apiAuth);

module.exports = routes;
