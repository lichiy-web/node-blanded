import createHttpError from 'http-errors';
import { findUserByEmail } from '../services/users.js';

export const userController = (req, res) => {
  const user = findUserByEmail(req.body.email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
};
