import { prisma } from '@/database/prisma'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeliveriesStatusController {
    async update(request: Request, response: Response) {
        const requestParamSchema = z.object({
            id: z.string().uuid(),
        })
        const requestBodySchema = z.object({
            status: z.enum(['processing', 'shipped', 'delivered']),
        })

        const { id } = requestParamSchema.parse(request.params)
        const { status } = requestBodySchema.parse(request.body)

        await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            },
        })

        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: status,
            },
        })

        response.json()
    }
}
