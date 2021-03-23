const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const routes = express.Router();

/**================================================================================
 *                                     ROUTES
 * =============================================================================**/
const apiV1Routes = express.Router({ mergeParams: true });
routes.use("/api/v1", apiV1Routes);

/**
 * AUTHENTICATION
 */
// apiV1Routes.post("/auth/login", controllers.auth.login);

module.exports = routes;
