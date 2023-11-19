import { Router } from 'express'
import authUser from '../middleware/auth.js'
import UserController from '../controllers/userController.js'
import UserModel from '../models/userModel.js'

const userRouter = Router()

const userController = new UserController({ userModel: UserModel })

userRouter.get('/', authUser, userController.profile)
userRouter.get('/verificar', authUser, userController.verify)
userRouter.post('/sesion', userController.login)
userRouter.post('/registro', userController.register)
userRouter.patch('/', authUser, userController.update)
userRouter.delete('/', authUser, userController.delete)

export default userRouter
