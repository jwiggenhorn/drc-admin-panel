import mongoose from 'mongoose'
const ObjectId = require('mongodb').ObjectId

const ParticipantDataSchema = new mongoose.Schema({
  StudyId: ObjectId,
  HorizSliderInputs: [[Number, Number]],
  VertSliderInputs: [[Number, Number]],
  ButtonOneInputs: [[Number, Boolean]],
  ButtonTwoInputs: [[Number, Boolean]],
  ButtonThreeInputs: [[Number, Boolean]],
  ToggleOneInputs: [[Number, Boolean]],
  ToggleTwoInputs: [[Number, Boolean]],
  ToggleThreeInputs: [[Number, Boolean]],
  JoystickInputs: [[Number, [Number, Number]]],
})

export default mongoose.models.ParticipantData ||
  mongoose.model('ParticipantData', ParticipantDataSchema)
