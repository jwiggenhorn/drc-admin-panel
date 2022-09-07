import { useCors } from '@lib/cors'
import dbConnect from '@lib/db-connect'
import Study from '@models/study'

// GET /study/data/[key]
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
    res
      .status(200)
      .json((({ song, inputProfile }) => ({ song, inputProfile }))(study))
  } catch (error) {
    res.status(400).send()
  }
}
