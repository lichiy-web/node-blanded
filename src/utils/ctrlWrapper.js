export const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
