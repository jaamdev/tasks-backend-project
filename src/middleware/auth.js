import { jwtVerify } from 'jose'
import UserModelSchema from '../schemas/user.schema.js'

export default async function authUser (req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      result: false,
      response: ['Usuario no autorizado']
    })
  }

  const jwt = authorization.split(' ')[1]

  if (!jwt) {
    return res.status(401).json({
      result: false,
      response: ['Usuario no autorizado']
    })
  }

  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode(process.env.JWT_KEY)
    )
    const existUserInBD = await UserModelSchema.findById(payload.id).exec()
    if (!existUserInBD) {
      return res.status(401).json({
        result: false,
        response: ['Esta cuenta fue eliminada']
      })
    }
    const user = {
      id: existUserInBD._id.toString(),
      name: existUserInBD.name,
      admin: existUserInBD.admin
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      result: false,
      response: ['Usuario no autorizado']
    })
  }
}
