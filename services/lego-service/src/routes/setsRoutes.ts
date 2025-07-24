import express from 'express'
import { getSets } from '../controllers/setsController'

const setsRouter = express.Router()

setsRouter.get('/', getSets)

export default setsRouter