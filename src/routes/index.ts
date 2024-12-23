import { Router } from 'express'
import { usersRoutes } from './UsersRoutes'
import { sessionRoutes } from './SessionsRoutes'
import { deliviriesRoutes } from './DeliveriesRoutes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/deliveries', deliviriesRoutes)

export { routes }
