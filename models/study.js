import mongoose from 'mongoose'

const StudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this study.'],
    maxlength: [60, 'Name cannot be more than 60 characters.'],
  },
  admin: {
    type: String,
    required: [true, "Please provide the admin's name."],
    maxlength: [60, "Admin's name cannot be more than 60 characters."],
  },
  key: {
    type: String,
    required: [true, 'Study must have key.'],
    maxlength: [5, 'Study key cannot be more than 5 characters.'],
  },
})

export default mongoose.models.Study || mongoose.model('Study', StudySchema)
