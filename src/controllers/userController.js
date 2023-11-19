import { validateUserRegister, validatePartialUserRegister } from '../schemas/userRegister.zod.js'
import { validateUserLogin } from '../schemas/userLogin.zod.js'
import { SignJWT } from 'jose'

export default class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  profile = async (req, res) => {
    const { id } = req.user

    if (!id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const getProfile = await this.userModel.profile({ input: id })

    if (!getProfile) {
      return res.status(404).json({
        result: false,
        response: ['Usuario no encontrado']
      })
    }

    const result = {
      name: getProfile.name,
      email: getProfile.email
    }

    return res.status(200).json({
      result: true,
      response: ['Usuario encontrado'],
      data: result
    })
  }

  verify = async (req, res) => {
    if (!req.user.id || !req.user.name) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Token verificado'],
      data: { _id: req.user.id, name: req.user.name, admin: req.user.admin }
    })
  }

  login = async (req, res) => {
    const result = validateUserLogin(req.body)

    if (!result.success) {
      return res.status(400).json({
        result: false,
        response: result.error.issues.map(error => error.message)
      })
    }

    const checkUser = await this.userModel.login({ input: result.data })

    if (!checkUser) {
      return res.status(401).json({
        result: false,
        response: ['Las credenciales son incorrectas']
      })
    }

    const jwtConstructor = new SignJWT({ id: checkUser._id })
    const encoder = new TextEncoder()
    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
      }).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_KEY))

    return res.status(200).json({
      result: true,
      response: ['Inicio de sesión realizado con éxito'],
      data: { id: checkUser._id, name: checkUser.name, admin: checkUser.admin, token: jwt }
    })
  }

  register = async (req, res) => {
    const result = validateUserRegister(req.body)

    if (!result.success) {
      return res.status(400).json({
        result: false,
        response: result.error.issues.map(error => error.message)
      })
    }

    const newUser = await this.userModel.register({ input: result.data })

    if (!newUser) {
      return res.status(409).json({
        result: false,
        response: ['Ya existe un usuario con ese correo electrónico']
      })
    }

    return res.status(201).json({
      result: true,
      response: ['Usuario registrado con éxito']
    })
  }

  update = async (req, res) => {
    const result = validatePartialUserRegister(req.body)

    if (!result.success) {
      return res.status(400).json({
        result: false,
        response: result.error.issues.map(error => error.message)
      })
    }

    if (!req.user.id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const updateProfile = await this.userModel.update({ id: req.user.id, input: result.data })

    if (!updateProfile) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const data = {
      name: updateProfile.name,
      email: updateProfile.email
    }

    return res.status(200).json({
      result: true,
      response: ['Usuario actualizado con éxito'],
      data
    })
  }

  delete = async (req, res) => {
    const { id } = req.user

    if (!id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const userDeleted = await this.userModel.delete({ id })

    if (!userDeleted) {
      return res.status(401).json({
        result: false,
        response: ['El usuario no ha sido borrado']
      })
    }

    res.status(200).json({
      result: true,
      response: ['Usuario eliminado con éxito']
    })
  }
}
