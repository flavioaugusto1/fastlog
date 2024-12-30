import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/database/prisma'

describe('SessionsController', () => {
    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user_id,
            },
        })
    })

    it('should authenticate a and get access token', async () => {
        const userResponse = await request(app).post('/users').send({
            name: 'Teste User',
            email: 'test4@example.com',
            password: 'password@123',
        })

        expect(userResponse.status).toBe(201)

        user_id = userResponse.body.user.id

        const sessionResponse = await request(app).post('/sessions').send({
            email: 'test4@example.com',
            password: 'password@123',
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})
