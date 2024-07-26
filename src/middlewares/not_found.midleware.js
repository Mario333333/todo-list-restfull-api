module.exports = function (req, res, next) {
  const { url } = req;
  // next function to give pass to next midlleware off express list
  return res.status(404).send({ message: `Resource ${url} not found` });
};
