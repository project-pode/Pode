const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password){
    return response.status(400).json({
      error:'no password given'
    });
  }
  if (password.length <3){
    return response.status(400).json({
      error:'password minimum length is 3 characters'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

   // Generate JWT token after saving user
   const userForToken = {
    username: savedUser.username,
    id: savedUser._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET,
    { expiresIn:60000*60000 });


  // Return the user details along with the JWT token
  response.status(201).json({
    token,
    username: savedUser.username,
    name: savedUser.name,
    id: savedUser._id
  });
});

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({});
  response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});


module.exports = usersRouter;