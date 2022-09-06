import { getToken } from 'next-auth/jwt'
import dbConnect from '@lib/db-connect'
import { generateKey } from '@lib/utils'
import Study from '@models/study'
import ParticipantData from '@models/participantData'

export default async function handler(req, res) {
  await dbConnect()
  const token = await getToken({ req })

  switch (req.method) {
    case 'GET':
      // GET /study
      // Endpoint to return participant data regarding 1 study.
      try {
        if (!token) {
          return res.status(401).send()
        }
        const { id } = req.query
        const study = await Study.findOne({ _id: id })

        if (!study) {
          return res.status(404).send()
        }
        if (study.author != token.email) {
          return res.status(401).send()
        }
        console.log(`Fetching participant data for study with id ${id}`)
        const data = await ParticipantData.find({ _id: study.data })
        res.status(200).json({ study, data })
      } catch (error) {
        res.status(400).send()
      }
      break
    case 'POST':
      // POST /study
      // Endpoint for creating studies via the admin panel.
      // Note: study author will be decoded from user JWT.
      try {
        if (!token) {
          return res.status(401).send()
        }
        console.log(`Creating new study for user ${token.email}...`)
        // Make sure generated key doesn't already exist in DB
        let key = generateKey()
        while (await Study.findOne({ key })) {
          key = generateKey()
        }
        const study = await Study.create({
          ...req.body,
          key,
          author: token.email,
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
