import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'GET'],
})

function useCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export { useCors }
