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
    convertJoystickData(participantData, study.joystickSensitivity)
    interpolateData(participantData, stopTime)
    console.log(`Adding participant data for study with key ${key}...`)
    const data = await ParticipantData.create(participantData)
    await Study.findOneAndUpdate({ key }, { $push: { data: data._id } })
    res.status(201).json()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

function convertJoystickData(participantData, sensitivity) {
  const joystickData = participantData.joystickInputs
  if (!joystickData || joystickData.length == 0) return

  participantData.joystickInputs = joystickData.map((dataPoint) => {
    if (dataPoint.value != undefined) return dataPoint
    const radians = Math.atan2(dataPoint.y, dataPoint.x) - Math.PI / 2

    let degrees = ((radians * 180) / Math.PI) * -1
    if (degrees < 0) degrees += 360.0

    let value = Math.round((degrees * 2) / 60)
    if (value == 0) value = 12

    if (sensitivity == 'low') {
      value = Math.round(value / 1.5) * 1.5
    }

    return { timestamp: dataPoint.timestamp, value }
  })
}

function interpolateData(participantData, stopTime) {
  for (const inputType in participantData) {
    const dataPoints = participantData[inputType]
    if (dataPoints.length == 0) continue

    dataPoints.forEach((dataPoint) => {
      dataPoint.timestamp = Math.round(dataPoint.timestamp / 100) * 100
    })

    const interpolatedDataPoints = []
    let currentVal = 0
    for (let i = 0; i <= stopTime; i += 100) {
      const pointAtTime = dataPoints
        .filter((dataPoint) => dataPoint.timestamp == i)
        .pop()
      if (pointAtTime) currentVal = pointAtTime.value
      interpolatedDataPoints.push({ timestamp: i, value: currentVal })
    }
    participantData[inputType] = interpolatedDataPoints
  }
}
