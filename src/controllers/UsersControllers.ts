import { Request, Response } from 'express'
import { prisma } from '@/database/prisma'
import { hash } from 'bcrypt'
import { z } from 'zod'
import { AppError } from '@/utils/AppError'

export class UsersController {
    async create(request: Request, response: Response) {
        const requestBodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = requestBodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (userWithSameEmail) {
            throw new AppError('User already exists', 401)
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        const { password: _, ...userWithoutPassword } = user

        return response
            .status(201)
            .json({ message: 'Criado com sucesso!', user: userWithoutPassword })
    }
}
