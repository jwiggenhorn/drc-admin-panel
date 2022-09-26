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
