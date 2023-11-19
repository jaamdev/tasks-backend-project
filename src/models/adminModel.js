import UserModelSchema from '../schemas/user.schema.js'
import TaskModelSchema from '../schemas/task.schema.js'

export default class AdminModel {
  static async getAllUsers () {
    const result = await UserModelSchema.find().exec()
    if (!result) return false
    return result
  }

  static async getUserTasks ({ input }) {
    const result = await TaskModelSchema.find({ user: input }).exec()
    if (!result) return false
    return result
  }

  static async removeUser ({ input }) {
    const result = await UserModelSchema.findByIdAndRemove(input).exec()
    await TaskModelSchema.deleteMany({ user: input }).exec()
    if (!result) return false
    return true
  }
}
