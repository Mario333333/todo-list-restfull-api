const mCache = require("memory-cache");
const { CACHE_KEY } = require("../config");

module.exports = function (duration) {
  return function (req, res, next) {
    const key = CACHE_KEY + (req.originalUrl || req.url);

    /*  mCache.del(key)
    mCache.clear() */
    const cacheBody = mCache.get(key);

    if (cacheBody) {
      return res.send(JSON.parse(cacheBody));
    } else {
      res.sendResponse = res.send;
      //whe ejecute send.res will fill memory cache and finaly ejecute his response
      res.send = (body) => {
        mCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
    }

    next();
  };
};
