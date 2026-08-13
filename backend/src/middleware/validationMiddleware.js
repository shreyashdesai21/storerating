export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (Array.isArray(error?.errors)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({ field: Array.isArray(err.path) ? err.path.join('.') : '', message: err.message }))
      });
    }
    next(error);
  }
};

export const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync(req.query);
    next();
  } catch (error) {
    if (Array.isArray(error?.errors)) {
      return res.status(400).json({
        success: false,
        message: 'Query validation failed',
        errors: error.errors.map(err => ({ field: Array.isArray(err.path) ? err.path.join('.') : '', message: err.message }))
      });
    }
    next(error);
  }
};
