const jwt = require('jsonwebtoken');
module.exports = {
  createToken: (payload) => {
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    return token;
  },
};
