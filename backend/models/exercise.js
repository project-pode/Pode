const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
  },
  description: String,
  difficulty: Number,
  correctAnswer: mongoose.Schema.Types.Mixed, //can be any type, since we have different exercises
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  type: String,
  options: [String],
  question: String,
});

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;