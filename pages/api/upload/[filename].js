import { getToken } from 'next-auth/jwt'
import { Storage } from '@google-cloud/storage'

export default async function handler(req, res) {
  const token = await getToken({ req })
  if (!token) {
    return res.status(401).send()
  }

  try {
    const { filename } = req.query
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
      },
    })
    const [url] = await storage
      .bucket(process.env.BUCKET_NAME)
      .file(filename)
      .getSignedUrl({
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: 'application/octet-stream',
      })
    res.status(200).json(url)
  } catch (error) {
    res.status(400).send()
    console.error(error)
  }
}
