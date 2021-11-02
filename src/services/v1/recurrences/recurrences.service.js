// Initializes the `recurrences` service on path `/v1/recurrences`
const { Recurrences } = require('./recurrences.class');
const createModel = require('../../../models/recurrences.model');
const hooks = require('./recurrences.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/recurrences', new Recurrences(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/recurrences');

  service.hooks(hooks);
};
