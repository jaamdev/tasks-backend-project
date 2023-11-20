import cors from 'cors'

export default function corsMiddleware () {
  return cors({
    origin: process.env.FRONT_URL,
    methods: 'GET,POST,PATCH,DELETE'
  })
}
