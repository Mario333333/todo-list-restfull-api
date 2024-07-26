const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function ({ HomeRoutes, UserRoutes, TaskRoutes, SubtasksRoutes ,AuthRoutes, CommentRoutes}) {
  const router = express.Router();
  const apiRoutes = express.Router();
  /**
   * middlewares executed when the are request after to go the endpoint o resource
   */
  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());
  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/task", TaskRoutes);
  apiRoutes.use("/subtasks", SubtasksRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  apiRoutes.use("/comment", CommentRoutes);

  
  router.use("/v1/api", apiRoutes);
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
