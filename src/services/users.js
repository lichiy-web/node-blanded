// import { SessionCollection } from '../db/models/Session.js';
import { UserCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { env } from '../utils/env.js';
import jwt from 'jsonwebtoken';
// import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => UserCollection.findOne({ email });
export const findUserById = (userId) => UserCollection.findById(userId);

export const clearToken = (userId) =>
  UserCollection.findOneAndUpdate({ _id: userId }, { token: '' });

export const updateUserWithToken = (userId) => {
  const token = jwt.sign({ userId }, env('JWT_SECRET'));
  console.log('\n JWT_SECRET = ', env('JWT_SECRET'));
  return UserCollection.findOneAndUpdate(
    { _id: userId },
    { token },
    { new: true },
  );
};

export const createUser = async (userData) => {
  const userPassword = userData.password;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  const newUser = await UserCollection.create({
    ...userData,
    password: hashedPassword,
  });
  return await updateUserWithToken(newUser._id);
};
