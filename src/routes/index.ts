import { Router } from 'express'
import { usersRoutes } from './UsersRoutes'

const routes = Router()

routes.use('/users', usersRoutes)

export { routes }
