import { getToken } from 'next-auth/jwt'
import dbConnect from '@lib/db-connect'
import Study from '@models/study'

export default async function handler(req, res) {
  await dbConnect()
  const token = await getToken({ req })

  // GET /admin
  // This endpoint returns a list of Study objects
  // owned by the caller (indicated in token).
  try {
    if (!token) {
      return res.status(401).send()
    }
    console.log(`Fetching studies for user ${token.email}...`)
    const studies = await Study.find({ author: token.email })
    res.status(200).json(studies)
  } catch (error) {
    res.status(400).send()
  }
}
