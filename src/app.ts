import express from 'express'
import 'express-async-errors'
import { errorHandling } from '@/middlewares/ErrorHandling'
import { routes } from './routes'

export const app = express()

app.use(express.json())
app.use(routes)

app.use(errorHandling)
