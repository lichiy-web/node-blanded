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

router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:productId', ctrlWrapper(getProductByIdController));

router.post('/products', ctrlWrapper(addNewProductController));

router.delete('/products/:productId', ctrlWrapper(deleteProductByIdController));

router.patch('/products/:productId', ctrlWrapper(updateProductController));
export default router;
