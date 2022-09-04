export async function post(url, jwt, content) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
    body: JSON.stringify(content),
  })
}

export function generateKey() {
  return Array.from(Array(5), () => Math.floor(Math.random() * 36).toString(36))
    .join('')
    .toUpperCase()
}
