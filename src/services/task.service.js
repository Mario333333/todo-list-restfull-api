const BaseService = require("./base.service");
let _taskRepository = null;

class TaskService extends BaseService {
  constructor({ TaskRepository }) {
    super(TaskRepository);
    _taskRepository = TaskRepository;
  }

  async getUserTasks(author) {
    if (!author) {
      let error = new Error();
      error.status = 400;
      error.message = "User id must be sent";
      throw error;
    }

    return await _taskRepository.getUserTasks(author);
  }

  async closeTask(taskId) {
    if (!taskId) {
      const error = new Error();
      error.status = 400;
      error.message = "Task id must be sent";
      throw error;
    }

    const task = await _taskRepository.get(taskId);
    if (!task) {
      const error = new Error();
      error.status = 404;
      error.message = "Task does not exist";
      throw error;
    }
    const thereAreSubTasksPending = task.subTasks.some(
      (element) => element.isClosed === false
    );

    if (thereAreSubTasksPending) {
      const error = new Error();
      error.status = 400;
      error.message = "Task have pending subtasks";
      throw error;
    }

    return await _taskRepository.update(taskId, { isClosed: true });
  }

  async openTask(taskId) {
    if (!taskId) {
      const error = new Error();
      error.status = 400;
      error.message = "Task id must be sent";
      throw error;
    }

    const task = await _taskRepository.get(taskId);
    if (!task) {
      const error = new Error();
      error.status = 404;
      error.message = "Task does not exist";
      throw error;
    }

    return await _taskRepository.update(taskId, { isClosed: false });
  }
}

module.exports = TaskService;
