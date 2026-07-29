import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'
import { jobController } from '../container'

const router = Router()

router.use(authMiddleware)

router.get('/', jobController.list)
router.get('/:id', jobController.getById)
router.post('/', jobController.create)
router.put('/:id', jobController.update)
router.delete('/:id', jobController.remove)

export default router
