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

/**
 * WALLET
 */
const walletResource = express.Router({ mergeParams: true });
apiV1Routes.use("/wallets", walletResource);

walletResource.get("", controllers.v1.wallets.index);
walletResource.post("", controllers.v1.wallets.create);
walletResource.get("/:id", controllers.v1.wallets.view);
walletResource.delete("/:id", controllers.v1.wallets.delete);
walletResource.put("/:id", controllers.v1.wallets.update);

/**
 * ENTRY
 */
const walletEntryResource = express.Router({ mergeParams: true });
apiV1Routes.use("/wallets/:walletId/entries", walletEntryResource);

walletEntryResource.get("", controllers.v1.wallets.entries.index);
walletEntryResource.post("", controllers.v1.wallets.entries.create);
walletEntryResource.get("/:id", controllers.v1.wallets.entries.view);
walletEntryResource.delete("/:id", controllers.v1.wallets.entries.delete);
walletEntryResource.put("/:id", controllers.v1.wallets.entries.update);

module.exports = routes;
