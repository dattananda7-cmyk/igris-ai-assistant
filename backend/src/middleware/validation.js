const { z } = require('zod');
const { AppError } = require('./errorHandler');
const { ERROR_CODES, HTTP_STATUS } = require('../utils/constants');

const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message;
        return acc;
      }, {});

      return next(new AppError(
        'Validation failed',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        details
      ));
    }
    next(error);
  }
};

module.exports = { validate };
