import express, { Request, Response } from 'express';
import { IUser, User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { SECRET } from '../utils/config';

const router = express.Router();

/**
 * @route   POST /users
 * @desc    Register a new user and return a JWT token
 * @access  Public
 */
router.post('/', async (request: Request, response: Response): Promise<void> => {
  const { username, name, password } = request.body;

  try {
    // Validate input fields
    if (!username) {
      response.status(400).json({ error: 'Username is required' });
      return;
    }
    if (!password) {
      response.status(400).json({ error: 'No password given' });
      return;
    }
    if (password.length < 3) {
      response.status(400).json({ error: 'Password minimum length is 3 characters' });
      return;
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      response.status(400).json({ error: 'This username already exists' });
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user: IUser = new User({
      username,
      name,
      passwordHash,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Generate JWT token for authentication
    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };

    const token = jwt.sign(userForToken, SECRET as Secret, { expiresIn: '1h' });

    // Return user details along with the JWT token
    response.status(201).json({
      token,
      username: savedUser.username,
      name: savedUser.name,
      id: savedUser._id,
    });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   GET /users/:id
 * @desc    Get a specific user by ID
 * @access  Public
 */
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route   PUT /users/:id
 * @desc    Update user avatar
 * @access  Private
 */
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const user = request.user; // Retrieve authenticated user

    if (user) {
      user.avatar = request.body.avatar;

      const updatedUser = await user.save();
      response.json(updatedUser);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

export default router;