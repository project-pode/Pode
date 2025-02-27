import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { SECRET } from '../utils/config';
const router = express.Router();


router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Password or username is incorrect'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET as Secret,
    { expiresIn: 60000 * 60000 });

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id }); // user id will be used in endpoints
});

export default router;