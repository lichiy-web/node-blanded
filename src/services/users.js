import { userCollection } from '../db/models/User.js';

export const findUserByEmail = (email) => userCollection.findOne({ email });
