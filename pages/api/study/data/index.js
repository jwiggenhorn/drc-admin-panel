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
    const { key, stopTime, ...participantData } = req.body
    const study = await Study.findOne({ key })
    if (study.data.length >= study.participantLimit) {
      return res.status(403).send()
    }
    interpolateData(participantData, stopTime)
    console.log(`Adding participant data for study with key ${key}...`)
    const data = await ParticipantData.create(participantData)
    await Study.findOneAndUpdate({ key }, { $push: { data: data._id } })
    res.status(201).json()
  } catch (error) {
    res.status(400).send()
  }
}

function interpolateData(participantData, stopTime) {
  for (const inputType in participantData) {
    const dataPoints = participantData[inputType]
    if (dataPoints.length == 0) continue

    dataPoints.forEach((dataPoint) => {
      dataPoint.timestamp = Math.round(dataPoint.timestamp / 10) * 10
    })

    const interpolatedDataPoints = []
    let currentVal = 0
    for (let i = 0; i <= stopTime; i += 10) {
      const pointAtTime = dataPoints.find(
        (dataPoint) => dataPoint.timestamp == i
      )
      if (pointAtTime) currentVal = pointAtTime.value
      interpolatedDataPoints.push({ timestamp: i, value: currentVal })
    }
    participantData[inputType] = interpolatedDataPoints
  }
}
