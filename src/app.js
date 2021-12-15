require("dotenv").config({ silent: true });

const express = require("express");
const paginate = require('express-paginate');
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
var history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const passport = require("passport");

// CONFIGS
const app = express();


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

app.use(passport.initialize());
require("./config").passport(passport);

app.use(paginate.middleware(20, 100));

app.use(routes);
app.use(history());

module.exports = app;