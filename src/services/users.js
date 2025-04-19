import { SessionCollection } from '../db/models/Session.js';
import { UserCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => UserCollection.findOne({ email });

export const createUser = async (userData) => {
  const userPassword = userData.password;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  return UserCollection.create({ ...userData, password: hashedPassword });
};

export const createActiveSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });
  return SessionCollection.create(createSession(userId));
};
