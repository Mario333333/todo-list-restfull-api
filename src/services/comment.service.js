const BaseService = require("./base.service")
let _commentRepository = null,
    _taskRepository = null;

class CommentService extends BaseService {


    constructor({ CommentRepository, TaskRepository }) {
        super(CommentRepository)
        _commentRepository = CommentRepository
        _taskRepository = TaskRepository
    }

    async getTaskComments(taskId) {
        if (!taskId) {
            const error = new Error()
            error.status = 400;
            error.message = "Idea id must be sent"
            throw error
        }
        const task = await _taskRepository.get(taskId)

        if (!task) {
            const error = new Error()
            error.status = 404;
            error.message = "Idea does not exist"
            throw error
        }

        const { comments } = task

        return comments
    }


    async createComment(comment,taskId){
        if (!taskId) {
            const error = new Error()
            error.status = 400;
            error.message = "Idea id must be sent"
            throw error
        }

        const task = await _taskRepository.get(taskId)

        if (!task) {
            const error = new Error()
            error.status = 404;
            error.message = "Idea does not exist"
            throw error
        }

        const createdComment = await _commentRepository.create(comment)
        task.comments.push(createdComment);
console.log(createdComment, task);
        return await _taskRepository.update(taskId, {comments: task.comments}) 
    }
}


module.exports = CommentService;