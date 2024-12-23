import { Request, response, Response } from 'express'

export class DeliveriesController {
    async create(request: Request, repsonse: Response) {
        response.json({ message: 'ok' })
    }
}
