import { Request, response, Response } from 'express'
import { prisma } from '@/database/prisma'
import { z } from 'zod'

export class DeliveriesController {
    async create(request: Request, repsonse: Response) {
        const requestBodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = requestBodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description,
            },
        })

        response.status(201).json()
    }

    async index(request: Request, response: Response) {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user_id: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        })
        const total = deliveries.length

        response.json({ total, deliveries })
    }
}
