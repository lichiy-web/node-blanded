import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createUser,
  updateUserWithToken,
  clearToken,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import { UserCollection } from '../db/models/User.js';

export const userController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const newUser = await createUser(req.body);
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user)
    throw createHttpError(401, 'Unathorized', { details: 'Wrong credentials' });
  const areEqualPasswords = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!areEqualPasswords)
    throw createHttpError(401, 'Unathorized', { details: 'Wrong credentials' });
  const updatedUser = await updateUserWithToken(user._id);

  res.status(200).json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
    token: updatedUser.token,
  });
};

export const logoutUserController = async (req, res) => {
  await clearToken(req.user._id);

  res.status(204).end();
};
