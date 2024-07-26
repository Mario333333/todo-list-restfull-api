const BaseRepository = require("./base.repository")
let _task = null;


class TaskRepository extends BaseRepository{
    constructor({ Task }) {
        super(Task)
        _task = Task;
    }


    async getUserTasks(author){
        return await _task.find({author})
    }

}

module.exports = TaskRepository