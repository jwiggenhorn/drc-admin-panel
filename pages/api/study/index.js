import { getToken } from 'next-auth/jwt'
import dbConnect from '@lib/db-connect'
import { generateKey } from '@lib/utils'
import Study from '@models/study'
import { Storage } from '@google-cloud/storage'

// POST /study
// Endpoint for creating studies via the admin panel.
// Study author is decoded from user JWT.
export default async function handler(req, res) {
  await dbConnect()
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).send()
  }

  try {
    const { songFilename, ...studyDetails } = req.body
    const url = await getSongUrl(songFilename)
    console.log(`Creating new study for user ${token.email}...`)
    // Make sure generated key doesn't already exist in DB
    let key = generateKey()
    while (await Study.findOne({ key })) {
      key = generateKey()
    }
    const study = await Study.create({
      ...studyDetails,
      key,
      author: token.email,
      url,
    })
    res.status(201).json({ data: study })
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
}

async function getSongUrl(songFilename) {
  if (!songFilename) return
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  })

  const [url] = await storage
    .bucket(process.env.BUCKET_NAME)
    .file(songFilename)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    })
  return url
}
