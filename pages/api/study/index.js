import dbConnect from '@lib/db-connect'
import { generateKey } from '@lib/utils'
import Study from '@models/study'
import ParticipantData from '@models/participantData'
import jwt_decode from 'jwt-decode'

export default async function handler(req, res) {
  await dbConnect()

  const user = jwt_decode(req.headers.authorization)

  switch (req.method) {
    case 'GET':
      // GET /study
      try {
        const { id } = req.query
        const study = await Study.findOne({ _id: id })
        console.log(`Fetching participant data for study with id ${id}`)
        const data = await ParticipantData.find({ _id: id })
        study.data = data
        res.status(200).json({ study })
      } catch (error) {
        res.status(400).send()
      }
      break
    case 'POST':
      // POST /study
      try {
        console.log(`Creating new study for user ${user.name}...`)
        // TODO: make sure generated key doesn't already exist in DB
        const study = await Study.create({
          ...req.body,
          key: generateKey(),
          author: user.name,
        })
        res.status(201).json({ data: study })
      } catch (error) {
        res.status(400).send()
      }
      break
    default:
      res.status(405).send()
      break
  }
}
