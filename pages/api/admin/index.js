import dbConnect from '@lib/db-connect'
import Study from '@models/study'
import jwt_decode from 'jwt-decode'

export default async function handler(req, res) {
  await dbConnect()
  const user = jwt_decode(req.headers.authorization)

  try {
    // GET /admin
    console.log(`Fetching studies for user ${user.name}...`)
    const studies = await Study.find({ author: user.name })
    res.status(200).json(studies)
  } catch (error) {
    res.status(400).send()
  }
}
