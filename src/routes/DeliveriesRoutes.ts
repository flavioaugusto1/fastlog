import { Router } from 'express'
import { DeliveriesController } from '@/controllers/DeliveriesController'
import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'
import { DeliveriesStatusController } from '@/controllers/DeliveriesStatusController'

const deliviriesRoutes = Router()
const deliveriesController = new DeliveriesController()
const deliveriesStatusController = new DeliveriesStatusController()

deliviriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(['sale']))
deliviriesRoutes.post('/', deliveriesController.create)
deliviriesRoutes.get('/', deliveriesController.index)
deliviriesRoutes.patch('/', deliveriesStatusController.update)

export { deliviriesRoutes }
