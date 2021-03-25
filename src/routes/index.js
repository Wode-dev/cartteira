const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const routes = express.Router();

/**================================================================================
 *                                     ROUTES
 * =============================================================================**/
const apiV1Routes = express.Router({ mergeParams: true });
routes.use("/api/v1", apiV1Routes);

const apiAuth = express.Router({ mergeParams: true });
routes.use("/api/auth", apiAuth);

/**
 * AUTHENTICATION
 */
apiAuth.post("/token", controllers.auth.token);
apiAuth.post("/register", controllers.auth.register);

module.exports = routes;
