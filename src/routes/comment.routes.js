const { Router } = require("express");

module.exports = function ({ CommentController }) {
  const router = Router();
  router.get("/:commentId/unique", CommentController.get);
  router.get("/:taskId", CommentController.getTaskComments);
  router.post("/:taskId", CommentController.create);
  router.patch("/:commentId", CommentController.update);
  router.delete("/:commentId", CommentController.delete);
  
  return router;
};
