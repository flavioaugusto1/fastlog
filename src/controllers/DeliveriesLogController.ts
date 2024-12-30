import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeliveriesLogController {
    async create(request: Request, response: Response) {
        const requestBodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        })

        const { delivery_id, description } = requestBodySchema.parse(
            request.body,
        )

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        })

        if (!delivery) {
            throw new AppError('Delivery not found', 404)
        }

        if (delivery.status === 'delivered') {
            throw new AppError('this order has already been delivered')
        }

        if (delivery.status === 'processing') {
            throw new AppError('change status to shipped')
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            },
        })

        response.status(201).json()
    }

    async show(request: Request, response: Response) {
        const requestParamSchema = z.object({
            delivery_id: z.string().uuid(),
        })

        const { delivery_id } = requestParamSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
            include: {
                DeliveryLog: true,
            },
        })

        if (
            request.user?.role === 'customer' &&
            request.user?.id !== delivery?.id
        ) {
            throw new AppError('the user can only view their deliveries', 401)
        }

        response.json({ delivery })
    }
}
