import dbConnect from '@lib/db-connect'
import Study from '@models/study'

export default async function handler(req, res) {
  await dbConnect()

  const { adminName } = req.query

  try {
    const studies = await Study.find({ admin: adminName })
    res.status(200).json(studies)
  } catch (error) {
    res.status(400).send()
  }
}
