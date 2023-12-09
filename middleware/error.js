const httpErrors = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
};

const isKnownHTTPErrorStatus = (num) => typeof num === 'number' && httpErrors[num] !== undefined;

module.exports = (err, req, res, next) => {
  const statusCode = isKnownHTTPErrorStatus(err) ? err : err.statusCode || 500;
  const message = err.message || httpErrors[statusCode] || String(err);

  if (statusCode === 500) {
    console.error(statusCode, message);
  }

  res.status(statusCode).json({ statusCode, message });
  next();
};
