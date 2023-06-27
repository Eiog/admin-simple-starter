import { Router } from 'express'
import info from './info'
import login from './login'
import status from './status'

const router = Router()
router.get('/info', info)
router.post('/login', login)
router.get('/status', status)
export default router
