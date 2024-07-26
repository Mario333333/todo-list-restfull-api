module.exports = function (err, req, res, next) {
  const status = err.status || 500;

  return res.status(status).send({
    status,
    message: err.message || "Internal server error",
  });
};
