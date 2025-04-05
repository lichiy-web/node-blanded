import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllProductsController } from '../controllers/products.js';

const router = new Router();

router.get('/products', ctrlWrapper(getAllProductsController));

export default router;
