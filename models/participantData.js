import mongoose from 'mongoose'

const ParticipantDataSchema = new mongoose.Schema({
  horizSliderInputs: [{ timestamp: Number, value: Number }],
  vertSliderInputs: [{ timestamp: Number, value: Number }],
  buttonOneInputs: [{ timestamp: Number, value: Boolean }],
  buttonTwoInputs: [{ timestamp: Number, value: Boolean }],
  buttonThreeInputs: [{ timestamp: Number, value: Boolean }],
  toggleOneInputs: [{ timestamp: Number, value: Boolean }],
  toggleTwoInputs: [{ timestamp: Number, value: Boolean }],
  toggleThreeInputs: [{ timestamp: Number, value: Boolean }],
  joystickInputs: [{ timestamp: Number, value: Number }],
})

export default mongoose.models.ParticipantData ||
  mongoose.model('ParticipantData', ParticipantDataSchema)
