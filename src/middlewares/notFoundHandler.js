import createHttpError from 'http-errors';

export const notFoundHandler = async (req, res, next) => {
  next(createHttpError(404, 'Route not found'));
};
