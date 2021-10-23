const express = require('express');

const middlewares = require('../middlewares');

const apiV1Routes = express.Router({ mergeParams: true });
const { v1 } = require('../controllers');

const { swagger } = require('../config');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

apiV1Routes.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swagger.v1, { explorer: true }))
);

/**
 * WALLET
 */
const walletResource = express.Router({ mergeParams: true });
apiV1Routes.use('/wallets', middlewares.anthentication, walletResource);

walletResource.get('', v1.wallets.index);
walletResource.post('', v1.wallets.create);
walletResource.get('/:id', v1.wallets.view);
walletResource.delete('/:id', v1.wallets.delete);
walletResource.put('/:id', v1.wallets.update);

/**
 * ENTRY
 */
const walletEntryResource = express.Router({ mergeParams: true });
apiV1Routes.use(
  '/wallets/:walletId/entries',
  middlewares.anthentication,
  walletEntryResource
);

walletEntryResource.get('', v1.wallets.entries.index);
walletEntryResource.post('', v1.wallets.entries.create);
walletEntryResource.get('/:id', v1.wallets.entries.view);
walletEntryResource.delete('/:id', v1.wallets.entries.delete);
walletEntryResource.put('/:id', v1.wallets.entries.update);

/**
 * RECURRENCES
 */
const recurrenceResource = express.Router({ mergeParams: true });
apiV1Routes.use('/recurrences', middlewares.anthentication, recurrenceResource);

recurrenceResource.get('', v1.recurrences.index);
recurrenceResource.post('', v1.recurrences.create);
recurrenceResource.get('/:id', v1.recurrences.view);
recurrenceResource.delete('/:id', v1.recurrences.delete);
recurrenceResource.put('/:id', v1.recurrences.update);

/**
 * CATEGORIES
 */
const categoryResource = express.Router({ mergeParams: true });
apiV1Routes.use('/categories', middlewares.anthentication, categoryResource);

categoryResource.get('', v1.categories.index);

module.exports = apiV1Routes;
