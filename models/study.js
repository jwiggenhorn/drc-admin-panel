import mongoose from 'mongoose'

const StudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    maxlength: 5,
  },
})

export default mongoose.models.Study || mongoose.model('Study', StudySchema)
