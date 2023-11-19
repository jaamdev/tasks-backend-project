import TaskModelSchema from '../schemas/task.schema.js'

export default class TaskModel {
  static async getAll ({ input }) {
    try {
      const result = await TaskModelSchema.find({ user: input }).exec()
      return result
    } catch (error) {
      return false
    }
  }

  static async getId ({ input }) {
    try {
      const result = await TaskModelSchema.findById(input).exec()
      return result
    } catch (error) {
      return false
    }
  }

  static async create ({ user, input }) {
    const { title, desc, date } = input

    const dateOrNot = {
      withDate: { title, desc, date, user },
      notDate: { title, desc, user }
    }

    const objectSchema = () => {
      if (!date) return dateOrNot.notDate
      else return dateOrNot.withDate
    }

    const newTask = new TaskModelSchema(objectSchema())

    const taskSaved = await newTask.save()

    return !taskSaved ? false : taskSaved
  }

  static async update ({ taskId, input }) {
    try {
      const task = await TaskModelSchema.findById(taskId).exec()

      task.title = input.title ?? task.title
      task.desc = input.desc ?? task.desc
      task.done = input.done ?? task.done
      task.date = input.date ?? task.date

      const updatedTask = await task.save()

      return {
        _id: updatedTask._id,
        title: updatedTask.title,
        desc: updatedTask.desc,
        done: updatedTask.done,
        date: updatedTask.date
      }
    } catch (error) {
      return false
    }
  }

  static async delete ({ input }) {
    try {
      await TaskModelSchema.findByIdAndDelete(input).exec()
      return true
    } catch (error) {
      return false
    }
  }
}
