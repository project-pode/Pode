import express, { Request, Response } from 'express';
import { IUser, User } from '../models/user';
import bcrypt from 'bcrypt';
const router = express.Router();
import jwt, { Secret } from 'jsonwebtoken';
import { SECRET } from '../utils/config';

router.post('/', async (request: Request, response: Response): Promise<void> => {
  const { username, name, password } = request.body;
  try {
    if (!username) {
      response.status(400).json({
        error: 'username is required'
      });
    }
    if (!password) {
      response.status(400).json({
        error: 'no password given'
      });
    }
    if (password.length < 3) {
      response.status(400).json({
        error: 'password minimum length is 3 characters'
      });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      response.status(400).json({
        error: 'This username already exists'
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user: IUser = new User({
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

    const token = jwt.sign(userForToken, SECRET as Secret,
      { expiresIn: 60000 * 60000 });


    // Return the user details along with the JWT token
    response.status(201).json({
      token,
      username: savedUser.username,
      name: savedUser.name,
      id: savedUser._id
    });
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get('/', async (_request, response) => {
  const users = await User
    .find({});
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

router.put('/:id', async (request, response) => {
  const user = request.user;
  if (user) {
    user.avatar = request.body.avatar;

    const updatedUser = await user.save();
    response.json(updatedUser);
  } else {
    response.status(404).end();
  }
});

export default router;