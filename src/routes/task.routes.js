import { Router } from 'express'
import authUser from '../middleware/auth.js'
import TaskController from '../controllers/taskController.js'
import TaskModel from '../models/taskModel.js'

const taskRouter = Router()

const taskController = new TaskController({ taskModel: TaskModel })

taskRouter.get('/', authUser, taskController.getAll)
taskRouter.get('/:id', authUser, taskController.getId)
taskRouter.post('/', authUser, taskController.create)
taskRouter.patch('/:id', authUser, taskController.update)
taskRouter.delete('/:id', authUser, taskController.delete)

export default taskRouter
