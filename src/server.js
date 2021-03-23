module.exports = (async () => {
  require("dotenv").config({ silent: true });

  await require("./models/config.js");

  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  const routes = require("./routes");
  const path = require("path");
  var history = require("connect-history-api-fallback");
  const bodyParser = require("body-parser");
  // const multer = require('multer');
  // var upload = multer({ dest: '../uploads/' });
  //
  // CONFIGS
  const app = express();
  // const app = require("https-localhost")();
  const port = process.env.PORT || 3333;

  //Static files
  const staticFileMiddleware = express.static(path.join(__dirname, "dist"));

  // MIDDLEWARES
  app.use(cors());
  app.use(helmet());
  //Serve os arquivos que estão upados.

  /** Body parsers */
  // for parsing application/json
  app.use(express.json());
  // for parsing application/xwww-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // for parsing multipart/form-data
  // app.use(upload.array());

  // app.use(routes);
  app.use(history());

  return app.listen(port, () => {
    console.log("Server is running on port: %d", port);
  });
})();
