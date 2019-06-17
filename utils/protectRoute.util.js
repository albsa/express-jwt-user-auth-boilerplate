module.exports = function proctectRoute(req, res, next){
  // if user exists the token was sent with the request
  if(req.user){
    console.log(req.user);
    //if user exists then go to next middleware
    next();
  }
// token was not sent with request send error to user
  else{
    res.status(401).json({error:'login is required'});
  }
}

