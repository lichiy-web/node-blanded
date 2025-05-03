import { Router } from 'express';
import { createUserSchema, loginUserSchema } from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  userController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = new Router();

router.post(
  '/signup',
  validateBody(createUserSchema),
  ctrlWrapper(userController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
