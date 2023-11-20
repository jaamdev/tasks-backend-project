export default class AdminController {
  constructor ({ adminModel }) {
    this.adminModel = adminModel
  }

  getAllUsers = async (req, res) => {
    const { admin } = req.user

    if (!admin) {
      return res.status(401).json({
        result: false,
        response: ['Acción no autorizada']
      })
    }

    const response = await this.adminModel.getAllUsers()

    if (!response) {
      return res.status(200).json({
        result: true,
        response: ['No hay usuarios'],
        data: []
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Petición aceptada'],
      data: response.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
      }))
    })
  }

  getUserTasks = async (req, res) => {
    const { admin } = req.user

    if (!admin) {
      return res.status(401).json({
        result: false,
        response: ['Acción no autorizada']
      })
    }

    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        result: false,
        response: ['Falta un ID válido']
      })
    }

    const response = await this.adminModel.getUserTasks({ input: id })

    if (response.length <= 0) {
      return res.status(200).json({
        result: true,
        response: ['No hay tareas'],
        data: []
      })
    }

    return res.status(200).json({
      result: true,
      response: ['Tareas encontradas'],
      data: response.map(task => ({
        _id: task._id,
        title: task.title,
        desc: task.desc,
        done: task.done,
        date: task.date
      }))
    })
  }

  removeUser = async (req, res) => {
    const { admin } = req.user

    if (!admin) {
      return res.status(401).json({
        result: false,
        response: ['Acción no autorizada']
      })
    }

    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        result: false,
        response: ['Falta un ID válido']
      })
    }

    const response = await this.adminModel.removeUser({ input: id })

    if (!response) {
      return res.status(404).json({
        result: false,
        response: ['El usuario no existe']
      })
    }

    const data = {
      _id: response._id,
      name: response.name,
      email: response.email
    }

    return res.status(200).json({
      result: true,
      response: ['Usuario eliminado'],
      data
    })
  }
}
