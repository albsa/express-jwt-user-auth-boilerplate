const router = require('express').Router();
const  { userController }  = require('../controllers');

// Routes
router.use('/users', userController);


module.exports = router;
