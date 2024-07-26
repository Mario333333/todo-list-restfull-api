const express = require("express");

const _express = express();
let _config = null;

class Server {
  constructor({ Config, Router }) {
    _express.use(Router);
    _config = Config;
  }

  start() {
    return new Promise((resolve) => {
      _express.listen(_config.PORT, () => {
        console.log(
          `${_config.APPLICATION_NAME} running on port ${_config.PORT}`
        );
        resolve();
      });
    });
  }
}

module.exports = Server;
