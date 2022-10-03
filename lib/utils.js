export async function post(url, content) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
}

export function generateKey() {
  return Array.from(Array(5), () => Math.floor(Math.random() * 36).toString(36))
    .join('')
    .toUpperCase()
}

export const inputProfileNames = new Map([
  [0, 'V. Slider'],
  [1, 'H. Slider'],
  [2, 'Joystick'],
  [3, 'Toggle'],
  [4, 'H. Slider + V. Slider'],
  [5, 'Joystick + V. Slider'],
  [6, 'Button'],
  [7, '2 Buttons'],
  [8, '3 Buttons'],
  [9, 'V. Slider + Button'],
  [10, 'Joystick + Button'],
  [11, 'V. Slider + Joystick'],
  [12, 'H. Slider + Joystick'],
  [13, 'Toggle + V. Slider'],
  [14, 'Toggle + H. Slider'],
  [15, 'Toggle + Joystick'],
  [16, '3 Toggles'],
])

export function generateDataForChart(participantData, selectedParticipant) {
  if (!participantData || participantData.length == 0) return
  const chartColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(53, 162, 235, 1)',
    'rgba(153, 102, 255, 1)',
  ]
  const data = {
    datasets: [],
  }

  for (const [k, v] of Object.entries(participantData[selectedParticipant])) {
    if (v.length != 0 && k.charAt(0) != '_') {
      data.datasets.push({
        label: k,
        data: Array.from(v, (e) => ({
          x: e.timestamp,
          y: e.value,
        })),
        backgroundColor: chartColors.pop(),
      })
    }
  }
  return data
}

export const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Timestamp (ms)',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
}

const inputProfileToNumControls = new Map([
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 2],
  [5, 2],
  [6, 1],
  [7, 2],
  [8, 3],
  [9, 2],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 2],
  [14, 2],
  [15, 2],
  [16, 3],
])

export function exportAsCSV(participantDataList, inputProfile, studyTitle) {
  // should never happen since export button not rendered unless there is data
  if (!participantDataList || participantDataList.length == 0) {
    alert('Study does not have any data')
    return
  }

  // calc arr size and init
  let maxDataLength = 0
  let numControls = inputProfileToNumControls.get(inputProfile)
  participantDataList.forEach((participantData) => {
    for (const [k, v] of Object.entries(participantData)) {
      if (Array.isArray(v) && v.length > maxDataLength) {
        maxDataLength = v.length
      }
    }
  })
  let numRows = maxDataLength + 2
  let numCols = (numControls * 2 + 1) * participantDataList.length
  let csvMat = []
  for (let i = 0; i < numRows; i++) {
    csvMat[i] = new Array(numCols).fill('')
  }

  // convert to 2d arr in format we want
  let currCol = 0
  participantDataList.forEach((participantData) => {
    for (const [k, v] of Object.entries(participantData)) {
      if (Array.isArray(v) && v.length > 0) {
        // add input list to mat at curr col
        csvMat[0][currCol] = k
        csvMat[1][currCol] = 'timestamp'
        csvMat[1][currCol + 1] = 'value'
        let currRow = 2
        v.forEach((input) => {
          csvMat[currRow][currCol] = input.timestamp
          csvMat[currRow][currCol + 1] = input.value
          currRow++
        })
        currCol += 2
      }
    }
    currCol++
  })

  // csvMat -> csv string
  let csvString = csvMat
    .map((row) =>
      row
        .map(String)
        .map((v) => v.replaceAll('"', '""'))
        .map((v) => `"${v}"`)
        .join(',')
    )
    .join('\r\n')

  // create blob obj to handle large datasets
  let blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  let url = URL.createObjectURL(blob)

  // download created file
  let pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', `${studyTitle}_export.csv`)
  pom.click()
}
