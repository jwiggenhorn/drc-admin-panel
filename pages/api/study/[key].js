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
        const studies = await Study.findOne({ key })
        res.status(200).json(studies)
      } catch (error) {
        res.status(400).send()
      }
      break
    case 'POST':
      // POST /study/[key]
      try {
        console.log(`Adding participant data for study with key ${key}...`)
        const study = await Study.findOne({ key })
        console.log(`Found study with id ${study._id}`)
        // const data = await ParticipantData.create({
        //   ...req.body,
        //   key: generateKey(),
        //   author: user.name,
        // })
        //await Study.findOneAndUpdate({key})
        const data = await ParticipantData.create({
          studyId: study._id,
          buttonOneInputs: [
            [0, true],
            [1, false],
            [2, true],
          ],
        })
        res.status(201).json({ data })
      } catch (error) {
        res.status(400).send()
      }
      break
    default:
      res.status(405).send()
      break
  }
}
