import { Router } from 'express'
import { DeliveriesLogController } from '@/controllers/DeliveriesLogController'

import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'
import { verifyUserAuthorization } from '@/middlewares/VerifyUserAuthorization'

const deliveriesLogRoutes = Router()
const deliveriesLogConroller = new DeliveriesLogController()

deliveriesLogRoutes.post(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization(['sale']),
    deliveriesLogConroller.create,
)
deliveriesLogRoutes.get(
    '/delivery_id/show',
    ensureAuthenticated,
    verifyUserAuthorization(['sale', 'customer']),
    deliveriesLogConroller.show,
)
