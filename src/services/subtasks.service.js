const BaseService = require("./base.service");
let _subtaskRepository = null,
  _taskRepository = null;

class SubtasksService extends BaseService {
  constructor({ SubtasksRepository, TaskRepository }) {
    super(SubtasksRepository);
    _subtaskRepository = SubtasksRepository;
    _taskRepository = TaskRepository;
  }

  async getTaskSubtasks(taskId) {
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

    const { subTasks } = task;

    return subTasks;
  }

  async createSubTask(subTask, taskId) {
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

    const createdTask = await _subtaskRepository.create(subTask);

    task.subTasks.push(createdTask);

    return await _taskRepository.update(taskId, { subTasks: task.subTasks });
  }

  async closeSubTask(subtaskId) {
    if (!subtaskId) {
      const error = new Error();
      error.status = 400;
      error.message = "Task id must be sent";
      throw error;
    }

    const subTask = await _subtaskRepository.get(subtaskId);
    if (!subTask) {
      const error = new Error();
      error.status = 404;
      error.message = "Task does not exist";
      throw error;
    }

    return await _subtaskRepository.update(subtaskId, { isClosed: true });
  }

  async openSubTask(subtaskId, taskId) {
    if (!subtaskId) {
      const error = new Error();
      error.status = 400;
      error.message = "Task id must be sent";
      throw error;
    }

    const subTask = await _subtaskRepository.get(subtaskId);
    if (!subTask) {
      const error = new Error();
      error.status = 404;
      error.message = "Task does not exist";
      throw error;
    }

    const task = await _taskRepository.get(taskId);

    if (!task) {
      const error = new Error();
      error.status = 404;
      error.message = "Task does not exist";
      throw error;
    }

    if (task.isClosed) {
      const error = new Error();
      error.status = 400;
      error.message = "Task is closed this sub task can not be openned";
      throw error;
    }

    return await _subtaskRepository.update(subtaskId, { isClosed: false });
  }
}

module.exports = SubtasksService;
