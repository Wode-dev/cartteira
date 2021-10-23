const express = require('express');

const { auth } = require('../controllers');
const apiAuth = express.Router({ mergeParams: true });
/**
 * AUTHENTICATION
 */
apiAuth.post('/token', auth.token);
apiAuth.post('/register', auth.register);

module.exports = apiAuth;
