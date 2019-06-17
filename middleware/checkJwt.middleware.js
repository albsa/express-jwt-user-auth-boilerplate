const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const jwtKey = process.env.JWT_SECRET;


module.exports = async function(req,res,next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, jwtKey, async function(err,payload) {
      if (payload) {
        try {
          const doc = await userService.findUserById(payload._id);
          req.user = doc;
          next();
        } catch (err) {
          next()
        }
      } else {
        next()
      }
    })
  } catch(e) {
    next()
  }
}
