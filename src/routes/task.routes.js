const { Router } = require("express");
const { ParseIntMiddleware } = require("../middlewares");

module.exports = function ({ TaskController }) {
  const router = Router();
  router.get("/:taskId", TaskController.get);
  router.get("/:userId/all", TaskController.getUserTasks);
  router.get("/", ParseIntMiddleware, TaskController.getAll);
  router.post("/", TaskController.create);
  router.patch("/:taskId", TaskController.update);
  router.delete("/:taskId", TaskController.delete);

  router.post("/:taskId/close", TaskController.closeTask);
  router.post("/:taskId/open", TaskController.openTask);

  return router;
};
