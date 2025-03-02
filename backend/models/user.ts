import mongoose, {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  passwordHash: string;
  avatar: string;
  completedLessons: mongoose.Types.ObjectId[]; //array of lesson ids
  completedExercises: mongoose.Types.ObjectId[]; //array of exercise ids
}

const userSchema = new Schema({
  username: {
    type:String,
    required:true,
    unique:true,
    minlength:3
  },
  name: String,
  passwordHash: String,
  avatar: String,
  completedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  ],
  completedExercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

export const User = model<IUser>('User', userSchema);