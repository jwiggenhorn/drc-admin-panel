import mongoose from 'mongoose'

const ParticipantDataSchema = new mongoose.Schema({
  HorizSliderInputs: [{ millisecondsElapsed: Number, state: Number }],
  VertSliderInputs: [{ millisecondsElapsed: Number, state: Number }],
  ButtonOneInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  ButtonTwoInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  ButtonThreeInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  ToggleOneInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  ToggleTwoInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  ToggleThreeInputs: [{ millisecondsElapsed: Number, state: Boolean }],
  JoystickInputs: [
    { millisecondsElapsed: Number, state: { x: Number, y: Number } },
  ],
})

export default mongoose.models.ParticipantData ||
  mongoose.model('ParticipantData', ParticipantDataSchema)
