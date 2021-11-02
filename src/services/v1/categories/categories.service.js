// Initializes the `categories` service on path `/categories`
const { Categories } = require('./categories.class');
const hooks = require('./categories.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/categories', new Categories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/categories');

  service.hooks(hooks);
};
