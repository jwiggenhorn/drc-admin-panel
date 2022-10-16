import { getToken } from 'next-auth/jwt'
import dbConnect from '@lib/db-connect'
import { generateKey } from '@lib/utils'
import Study from '@models/study'
import formidable from 'formidable'
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
    const { body, song } = await new Promise((resolve, reject) => {
      formidable().parse(req, (err, fields, files) => {
        if (err) reject({ err })
        resolve({ body: JSON.parse(fields.body), song: files.song })
      })
    })
    const url = await uploadToCloudStorage(song)
    console.log(`Creating new study for user ${token.email}...`)
    // Make sure generated key doesn't already exist in DB
    let key = generateKey()
    while (await Study.findOne({ key })) {
      key = generateKey()
    }
    const study = await Study.create({
      ...body,
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

async function uploadToCloudStorage(song) {
  if (!song) return
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  })

  await storage
    .bucket(process.env.BUCKET_NAME)
    .upload(song.filepath, { destination: song.originalFilename })

  const [url] = await storage
    .bucket(process.env.BUCKET_NAME)
    .file(song.originalFilename)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    })
  return url
}

export const config = {
  api: {
    bodyParser: false,
  },
}
