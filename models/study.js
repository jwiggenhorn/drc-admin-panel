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
  song: ObjectId,
  inputProfile: Number,
})

export default mongoose.models.Study || mongoose.model('Study', StudySchema)
