import { Router } from 'express'
import { DeliveriesController } from '@/controllers/DeliveriesController'
import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'
import { verifyYserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const deliviriesRoutes = Router()
const deliveriesController = new DeliveriesController()

deliviriesRoutes.use(ensureAuthenticated, verifyYserAuthorization(['sale']))
deliviriesRoutes.post('/', deliveriesController.create)

export { deliviriesRoutes }
