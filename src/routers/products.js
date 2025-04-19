import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllProductsController,
  addNewProductController,
  getProductByIdController,
  deleteProductByIdController,
  updateProductController,
} from '../controllers/products.js';

const router = new Router();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.post('/', ctrlWrapper(addNewProductController));

router.delete('/:productId', ctrlWrapper(deleteProductByIdController));

router.patch('/:productId', ctrlWrapper(updateProductController));
export default router;
