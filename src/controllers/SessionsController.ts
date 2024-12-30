import { Request, Response } from 'express'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { authConfig } from '@/configs/auth'
import { z } from 'zod'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export class SessionsController {
    async create(request: Request, response: Response) {
        const requestBodySchema = z.object({
            email: z.string().email(),
            password: z.string().trim().min(6),
        })

        const { email, password } = requestBodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (!user) {
            throw new AppError('Email e/ou senha estão inválidos.')
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Email e/ou senha estão inválidos.')
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = await sign({ role: user.role ?? 'customer' }, secret, {
            subject: user.id,
            expiresIn,
        })

        const { password: hashedPassword, ...userWithoutPassword } = user

        response.json({ token, user: userWithoutPassword })

        return
    }
}
