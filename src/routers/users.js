import { Router } from 'express';
import { createUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import { userController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = new Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(userController),
);

export default router;
