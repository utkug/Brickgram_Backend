import express from 'express'
import { getThemes } from '../controllers/themesController'

const router = express.Router()

router.get('/', getThemes)

export default router