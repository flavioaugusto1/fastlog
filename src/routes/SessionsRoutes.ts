import { SessionsController } from '@/controllers/SessionsController'
import { Router } from 'express'

const sessionRoutes = Router()
const sessionsController = new SessionsController()

sessionRoutes.post('/', sessionsController.create)

export { sessionRoutes }
