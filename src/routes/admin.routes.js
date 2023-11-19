import { Router } from 'express'
import authUser from '../middleware/auth.js'
import AdminController from '../controllers/adminController.js'
import AdminModel from '../models/adminModel.js'

const adminRouter = Router()

const adminController = new AdminController({ adminModel: AdminModel })

adminRouter.get('/', authUser, adminController.getAllUsers)
adminRouter.get('/:id', authUser, adminController.getUserTasks)
adminRouter.delete('/:id', authUser, adminController.removeUser)

export default adminRouter
