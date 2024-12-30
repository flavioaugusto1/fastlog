import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/database/prisma'

describe('UsersController', () => {
    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user_id,
            },
        })
    })

    it('should create a new user successfully', async () => {
        const response = await request(app).post('/users').send({
            name: 'Test User',
            email: 'test_create2@email.com',
            password: 'password@123',
        })

        expect(response.status).toBe(201)
        expect(response.body.user).toHaveProperty('id')
        expect(response.body.user.name).toBe('Test User')

        user_id = response.body.user.id
    })

    it('should throw an error if user with same e-mail already exists', async () => {
        const response = await request(app).post('/users').send({
            name: 'Test User',
            email: 'test_create2@email.com',
            password: 'password@123',
        })

        expect(response.status).toBe(401)
    })

    it('should throw a validation error if e-mail is invalid', async () => {
        const response = await request(app).post('/users').send({
            name: 'Test User',
            email: 'test4com',
            password: 'password@123',
        })

        expect(response.status).toBe(400)
    })
})
