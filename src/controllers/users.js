import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createUser,
  createActiveSession,
} from '../services/users.js';
import bcrypt from 'bcrypt';
import { setupCookies } from '../utils/setupCookies.js';

export const userController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const newUser = await createUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: newUser.name,
      email: newUser.email,
    },
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
  const session = await createActiveSession(user._id);
  setupCookies(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accesToken: session.accessToken },
  });
};
