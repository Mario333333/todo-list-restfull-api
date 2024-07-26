const { Router } = require("express");

module.exports = function ({ SubtasksController }) {
  const router = Router();
  router.post("/:taskId", SubtasksController.create);
  router.patch("/:subtaskId", SubtasksController.update);
  router.get("/:subtaskId/unique", SubtasksController.get);
  router.get("/:taskId", SubtasksController.getTaskSubtasks);

  router.delete("/:subtaskId", SubtasksController.delete);
  router.put("/:subtaskId", SubtasksController.closeSubTask);
  router.post("/:subtaskId/:taskId/open", SubtasksController.openSubTask);
  
  return router;
};
