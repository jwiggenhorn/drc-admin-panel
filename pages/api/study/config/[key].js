import { useCors } from '@lib/cors'
import dbConnect from '@lib/db-connect'
import Study from '@models/study'

// GET /study/config/[key]
// This endpoint is used by the mobile app to load
// a study's song and input profile (control configuration).
export default async function handler(req, res) {
  await useCors(req, res)
  await dbConnect()

  try {
    const { key } = req.query
    const study = await Study.findOne({ key })
    if (!study) {
      return res.status(404).send()
    }
    if (study.data.length >= study.participantLimit) {
      return res.status(403).send()
    }
    res.status(200).json(
      (({ url, inputProfile, joystickSensitivity }) => ({
        url,
        inputProfile,
        joystickSensitivity,
      }))(study)
    )
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
}
