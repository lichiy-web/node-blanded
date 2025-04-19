import { Router } from 'express';
import { createUserSchema, loginUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import { userController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = new Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(userController),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper());

export default router;
