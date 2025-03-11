import express from 'express';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { SECRET } from '../utils/config';

const router = express.Router();

/**
 * @route   POST /
 * @desc    Authenticate user and return a JWT token
 * @access  Public
 */
router.post('/', async (request: Request, response: Response): Promise<void> => {
  try {
    const { username, password } = request.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Compare provided password with stored password hash
    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    // If authentication fails, return an error response
    if (!(user && passwordCorrect)) {
      response.status(401).json({ error: 'Password or username is incorrect' });
      return;
    }

    // Create a payload for the token
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    // Generate JWT token with expiration
    const token = jwt.sign(userForToken, SECRET as Secret, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Respond with the token and user details
    response.status(200).json({
      token,
      username: user.username,
      name: user.name,
      id: user._id, // User ID will be used in other API endpoints
    });
  } catch (error) {
    // Handle unexpected errors
    response.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
