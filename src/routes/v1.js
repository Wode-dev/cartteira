const express = require("express");

const apiV1Routes = express.Router({ mergeParams: true });
const { v1 } = require("../controllers");

const { swagger } = require("../config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

apiV1Routes.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swagger.v1, { explorer: true }))
);

/**
 * WALLET
 */
const walletResource = express.Router({ mergeParams: true });
apiV1Routes.use("/wallets", walletResource);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
walletResource.get("", v1.wallets.index);
walletResource.post("", v1.wallets.create);
walletResource.get("/:id", v1.wallets.view);
walletResource.delete("/:id", v1.wallets.delete);
walletResource.put("/:id", v1.wallets.update);

/**
 * ENTRY
 */
const walletEntryResource = express.Router({ mergeParams: true });
apiV1Routes.use("/wallets/:walletId/entries", walletEntryResource);

walletEntryResource.get("", v1.wallets.entries.index);
walletEntryResource.post("", v1.wallets.entries.create);
walletEntryResource.get("/:id", v1.wallets.entries.view);
walletEntryResource.delete("/:id", v1.wallets.entries.delete);
walletEntryResource.put("/:id", v1.wallets.entries.update);

module.exports = apiV1Routes;
