let _commentService = null;
class CommentController {

    constructor({ CommentService }) {
        _commentService = CommentService
    }


    async get(req, res) {
        const { commentId } = req.params;
        const comment = await _commentService.get(commentId);
        return res.send(comment);
    }

   

    async update(req, res) {
        const {body} = req;
        const { commentId } = req.params;
        const updatedComment = await _commentService.update(commentId, body)
        return res.send(updatedComment);
    }


    async delete(req, res) {

        const { commentId } = req.params;
        const deletedComment = await _commentService.delete(commentId)
        return res.send(deletedComment);
    }

    async getTaskComments(req,res){
        const {taskId} = req.params
        const comments = await _commentService.getTaskComments(taskId)
        return res.send(comments)

    }

    async create(req, res) {
        const { body } = req;
        const { taskId } = req.params;

        const createdComment = await _commentService.createComment(body, taskId);
        return res.status(201).send(createdComment);
    }


}

module.exports = CommentController