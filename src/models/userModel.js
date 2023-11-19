import UserModelSchema from '../schemas/user.schema.js'
import TaskModelSchema from '../schemas/task.schema.js'
import { hashPassword, comparePassword } from '../services/hashComparePassword.js'

export default class UserModel {
  static async profile ({ input }) {
    const existProfile = await UserModelSchema.findById(input).exec()

    if (!existProfile) return false

    return existProfile
  }

  static async verify ({ input }) {
    // LA CONSULTA NO ES NECESARIA
    // PORQUE YA SE HACE EN EL MIDDLEWARE
  }

  static async login ({ input }) {
    const { email, password } = input

    const existUser = await UserModelSchema.findOne({ email }).exec()

    if (!existUser) return false

    const isCorrect = await comparePassword(password, existUser.password)

    if (!isCorrect) return false

    return { _id: existUser._id, name: existUser.name, admin: existUser.admin }
  }

  static async register ({ input }) {
    const { name, email, password } = input

    const existEmail = await UserModelSchema.findOne({ email }).exec()

    if (existEmail) return false

    const hashedPassword = await hashPassword(password)

    const user = new UserModelSchema({
      name,
      email,
      password: hashedPassword
    })

    const result = await user.save()

    return result
  }

  static async update ({ id, input }) {
    const existUser = await UserModelSchema.findById(id).exec()

    if (!existUser) return false

    existUser.name = input.name ?? existUser.name
    existUser.email = input.email ?? existUser.email

    if (input.password) {
      const hashedPassword = await hashPassword(input.password)
      existUser.password = hashedPassword
    }

    const result = await existUser.save()

    return result
  }

  static async delete ({ id }) {
    const existUser = await UserModelSchema.findById(id).exec()
    if (!existUser) return false
    await TaskModelSchema.deleteMany({ user: id }).exec()
    const result = await existUser.deleteOne()
    return result
  }
}
