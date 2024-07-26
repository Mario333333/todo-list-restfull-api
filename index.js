const container = require("./src/startup/container");
const server = container.resolve("Server");
const { MONGO_URI } = container.resolve("Config");
const mongoose = require("mongoose");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    server.start();
  })
  .catch(console.log);
