const router = require('express').Router();
const { protectRoute } = require('../utils');
const { userService } = require('../services');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.get('/', protectRoute, (req,res) => {
  res.json({status: 'OK'})
});

router.post('/', async (req,res) => {
  const user = await userService.createUser(req.body);
  if (!user.errmsg) {
    console.log(user);
    const token = await jwt.sign(user._doc.email, jwtSecret);
    res.json({...user._doc, token});
  } else {
    res.status(500).json({error: user.errmsg});
  }
});

router.post('/signin', async (req,res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const isMatch = await user.isValidPassword(req.body.password);
    if (isMatch) {
      res.json(await jwt.sign({email: user._doc.email, _id: user._doc._id}, jwtSecret));
    } else {
      res.status(401).json({message: 'Invalid credentials or account not found'})
    }
  } catch(e) {
    res.status(401).json({message: e})
  }
 })

router.delete('/', async (req,res) => {
  const { id } = req.body;
  if (id) {
    res.json(await userService.deleteUser({ _id: id}));
  } else {
    res.status(500).json({error: 'ID is required'})
  }
})

module.exports = router;
