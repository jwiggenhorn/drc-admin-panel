import { useCors } from '@lib/cors'
import dbConnect from '@lib/db-connect'
import ParticipantData from '@models/participantData'
import Study from '@models/study'

// POST /study/data
// This endpoint is used by the mobile app to submit
// participant data to be added to an existing study.
export default async function handler(req, res) {
  await useCors(req, res)
  await dbConnect()

  try {
    const { key } = req.body
    const study = await Study.findOne({ key })
    if (study.data.length >= study.participantLimit) {
      return res.status(403).send()
    }
    console.log(`Adding participant data for study with key ${key}...`)
    const data = await ParticipantData.create({ ...req.body })
    await Study.findOneAndUpdate({ key }, { $push: { data: data._id } })
    res.status(201).json()
  } catch (error) {
    res.status(400).send()
  }
}
