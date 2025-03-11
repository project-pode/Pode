import mongoose, { Schema, model, Document } from 'mongoose';

/**
 * @interface IUser
 * @description Represents a user in the system, including their personal information, completed lessons, and exercises.
 */
export interface IUser extends Document {
  username: string; // Unique username for the user
  name: string; // Name of the user
  passwordHash: string; // Encrypted password hash
  avatar: string; // Avatar image URL for the user
  completedLessons: mongoose.Types.ObjectId[]; // Array of lesson IDs the user has completed
  completedExercises: mongoose.Types.ObjectId[]; // Array of exercise IDs the user has completed
}

/**
 * @schema userSchema
 * @description Defines the structure of a user document in MongoDB.
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true, // Username is required
    unique: true, // Username must be unique across users
    minlength: 3, // Username must be at least 3 characters long
  },
  name: {
    type: String, // User's name, optional
  },
  passwordHash: {
    type: String, // User's encrypted password
  },
  avatar: {
    type: String, // URL to the user's avatar image
  },
  completedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson', // Reference to completed lessons
    }
  ],
  completedExercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise', // Reference to completed exercises
    }
  ],
});

/**
 * @description Transforms the Mongoose document to JSON format before sending it as a response.
 * - Removes _id and __v fields from the response
 * - Converts _id to id
 * - Hides the passwordHash field for security reasons
 */
userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Do not reveal passwordHash in the response
  }
});

/**
 * @constant User
 * @description Mongoose model for the User schema.
 * Used to interact with the 'users' collection in the database.
 */
export const User = model<IUser>('User', userSchema);