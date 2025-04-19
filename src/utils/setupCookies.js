export const setupCookies = (res, session) => {
  res.cookies('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now + session.refreshTokenValidUntil),
  });
  res.cookies('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now + session.refreshTokenValidUntil),
  });
};
