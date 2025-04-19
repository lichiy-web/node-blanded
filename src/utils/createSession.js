import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from '../constants/index.js';

export const createSession = (userId) => {
  const accessToken = crypto.randomBytes(15).toString('base64');
  const refreshToken = crypto.randomBytes(15).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + ACCESS_TOKEN_EXP,
    refreshTokenValidUntil: Date.now() + REFRESH_TOKEN_EXP,
  };
};
