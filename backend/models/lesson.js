const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true,
  },
  description: String,
});

lessonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;