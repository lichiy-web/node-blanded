import { UserCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const findUserByEmail = (email) => UserCollection.findOne({ email });

export const createUser = async (userData) => {
  const userPassword = userData.password;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  return UserCollection.create({ ...userData, password: hashedPassword });
};
