import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'

export function verifyUserAuthorization(roler: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new AppError('Unauthorized', 401)
        }

        if (!roler.includes(request.user.role)) {
            throw new AppError('Unauthorized', 401)
        }

        next()
    }
}
