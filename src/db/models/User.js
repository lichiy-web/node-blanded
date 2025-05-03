import { Schema, model } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false },
);

export const UserCollection = model('user', userSchema);
