import { useCors } from '@lib/cors'
import dbConnect from '@lib/db-connect'
import ParticipantData from '@models/participantData'
import Study from '@models/study'

// endpoints for mobile app
export default async function handler(req, res) {
  await useCors(req, res)
  await dbConnect()

  const { key } = req.query

  switch (req.method) {
    case 'GET':
      // GET /study/[key]
      try {
        const study = await Study.findOne({ key })
        res.status(200).json(study)
      } catch (error) {
        res.status(400).send()
      }
      break
    case 'POST':
      // POST /study/[key]
      try {
        // TODO: block request if over participant limit
        console.log(`Adding participant data for study with key ${key}...`)
        const data = await ParticipantData.create({ ...req.body })
        await Study.findOneAndUpdate({ key }, { $push: { data: data._id } })
        res.status(201).json()
      } catch (error) {
        res.status(400).send()
      }
      break
    default:
      res.status(405).send()
      break
  }
}
