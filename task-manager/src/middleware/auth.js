const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, 'thisismynewcourse');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
    // console.log(token);
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
  //   console.log('auth middleware');
  //   next();
};

module.exports = auth;
