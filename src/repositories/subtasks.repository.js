const BaseRepository = require("./base.repository")
let _subtasks = null;


class SubtasksRepository extends BaseRepository{
    constructor({ Subtasks }) {
        super(Subtasks)
        _subtasks = Subtasks;
    }


  

}

module.exports = SubtasksRepository