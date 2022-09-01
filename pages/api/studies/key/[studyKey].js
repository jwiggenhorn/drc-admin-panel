import { useCors } from '@lib/cors'
import dbConnect from '@lib/db-connect'
import Study from '@models/study'

export default async function handler(req, res) {
  await useCors(req, res)
  await dbConnect()

  const { studyKey } = req.query

  try {
    const studies = await Study.findOne({ key: studyKey })
    res.status(200).json(studies)
  } catch (error) {
    res.status(400).send()
  }
}
