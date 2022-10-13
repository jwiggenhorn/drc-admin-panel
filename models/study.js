import mongoose from 'mongoose'
const ObjectId = require('mongodb').ObjectId

const StudySchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  key: {
    type: String,
    required: true,
    maxlength: 5,
  },
  data: [ObjectId],
  participantLimit: Number,
  inputProfile: Number,
  joystickSensitivity: String,
})

export default mongoose.models.Study || mongoose.model('Study', StudySchema)
