import dbConnect from '../../../lib/db-connect'
import { generateKey } from '../../../lib/utils'
import Study from '../../../models/study'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      // this endpoint will likely be removed in the future
      try {
        const studies = await Study.find()
        res.status(200).json({ data: studies })
      } catch (error) {
        res.status(400).send()
      }
      break
    case 'POST':
      try {
        // TODO: make sure generated key doesn't already exist in DB
        const study = await Study.create({ ...req.body, key: generateKey() })
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
