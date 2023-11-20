import { validateTask, validatePartialTask } from '../schemas/task.zod.js'

export default class TaskController {
  constructor ({ taskModel }) {
    this.taskModel = taskModel
  }

  getAll = async (req, res) => {
    const { id } = req.user

    if (!id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const getTasks = await this.taskModel.getAll({ input: id })

    if (!getTasks || getTasks.length === 0) {
      return res.status(200).json({
        result: true,
        response: ['No hay tareas'],
        data: []
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Tareas encontradas'],
      data: getTasks
    })
  }

  getId = async (req, res) => {
    const { id } = req.params

    if (!id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const getTask = await this.taskModel.getId({ input: id })

    if (!getTask) {
      return res.status(404).json({
        result: false,
        response: ['Tarea no encontrada']
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Tarea encontrada'],
      data: getTask
    })
  }

  create = async (req, res) => {
    const result = validateTask(req.body)

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

    const { title, desc, date, time } = result.data

    const input = {
      title,
      desc,
      date: date && time ? date + 'T' + time + ':00.000Z' : null
    }

    const taskCreated = await this.taskModel.create({ user: req.user.id, input })

    if (!taskCreated) {
      return res.status(422).json({
        result: false,
        response: ['La tarea no se pudo crear, inténtelo de nuevo']
      })
    }

    return res.status(201).json({
      result: true,
      response: ['Tarea creada con éxito'],
      data: taskCreated
    })
  }

  update = async (req, res) => {
    const result = validatePartialTask(req.body)
    const { id } = req.params

    if (!result.success) {
      return res.status(400).json({
        result: false,
        response: result.error.issues.map(error => error.message)
      })
    }

    if (!id) {
      return res.status(401).json({
        result: false,
        response: ['Usuario no autorizado']
      })
    }

    const updatedTask = await this.taskModel.update({ taskId: id, input: result.data })

    if (!updatedTask) {
      return res.status(422).json({
        result: false,
        response: ['La tarea no se pudo actualizar o no existe']
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Tarea actualizada con éxito'],
      data: updatedTask
    })
  }

  delete = async (req, res) => {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        result: false,
        response: ['Falta un ID válido']
      })
    }

    const taskDeleted = await this.taskModel.delete({ input: id })

    if (!taskDeleted) {
      return res.status(400).json({
        result: false,
        response: ['La tarea no se pudo borrar o no existe']
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Tarea borrada con éxito']
    })
  }
}
