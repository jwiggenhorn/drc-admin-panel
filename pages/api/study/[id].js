import { getToken } from 'next-auth/jwt'
import dbConnect from '@lib/db-connect'
import Study from '@models/study'
import ParticipantData from '@models/participantData'

export default async function handler(req, res) {
  await dbConnect()
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).send()
  }

  try {
    const { id } = req.query
    const study = await Study.findOne({ _id: id })
    if (!study) {
      return res.status(404).send()
    }
    if (study.author != token.email) {
      return res.status(401).send()
    }
    switch (req.method) {
      case 'GET':
        console.log(`Fetching participant data for study with id ${id}`)
        const data = await ParticipantData.find({ _id: study.data })
        res.status(200).json({ study, data })
        break
      case 'DELETE':
        console.log(study.data)
        study.data.forEach(async(d)=>{ await ParticipantData.deleteOne({ _id: d } )})
        await Study.deleteOne({ _id: study._id })
        res.status(200).send()
        break
    }
  } catch (error) {
    res.status(400).send()
  }
}


