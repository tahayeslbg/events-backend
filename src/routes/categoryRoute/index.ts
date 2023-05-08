import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import {
  getCategory,
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
} from '../../controllers/categoryController';

const router: Router = Router();

router.get('/', getCategories);
router.get('/:categoryId', getCategory);
router.post('/', authMiddleware, postCategory);
router.put('/:categoryId', authMiddleware, putCategory);
router.delete('/:categoryId', authMiddleware, deleteCategory);

export default router;
