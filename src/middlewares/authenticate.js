import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import jwt from 'jsonwebtoken';
import { findUserById } from '../services/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) next(createHttpError(401, 'Unauthorized'));
  const [type, token] = authHeader.split(' ');
  console.log('token = ', token);
  //   console.log('\n JWT_SECRET = ', env('JWT_SECRET'));

  if (type !== 'Bearer') next(createHttpError(401, 'Unauthorized'));
  const { userId } = jwt.verify(token, env('JWT_SECRET'));
  const user = await findUserById(userId);

  if (!user || user?.token !== token)
    next(createHttpError(404, 'User not found'));
  req.user = user;
  next();
};
