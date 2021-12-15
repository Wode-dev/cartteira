const app = require('./app');
module.exports = (async () => {
  require("dotenv").config({ silent: true });

  await require("./models/config.js");

  const port = process.env.PORT || 3333;

  return app.listen(port, () => {
    console.log("Server is running on port: %d", port);
  });
})();
