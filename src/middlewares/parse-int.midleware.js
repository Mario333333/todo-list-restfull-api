module.exports = function (req, res, next) {
  const queryStrings = req.query;

  for (const key in queryStrings) {
    const element = queryStrings[key];
    const length = element.length;
    const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));

    if (isValid) {
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }
  req.query = queryStrings;
  next();
};
