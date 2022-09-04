import mongoose from 'mongoose'

const ParticipantDataSchema = new mongoose.Schema({
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
