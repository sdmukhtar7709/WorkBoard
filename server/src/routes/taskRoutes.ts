import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'
import { taskController } from '../container'

const router = Router()

router.use(authMiddleware)

router.get('/', taskController.list)
router.get('/:id', taskController.getById)
router.post('/', taskController.create)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.remove)

export default router
