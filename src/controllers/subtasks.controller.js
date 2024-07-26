let _subtasksService = null;
class SubtasksController {
  constructor({ SubtasksService }) {
    _subtasksService = SubtasksService;
  }

  async get(req, res) {
    const { subtaskId } = req.params;
    const subTask = await _subtasksService.get(subtaskId);
    return res.send(subTask);
  }

  async update(req, res) {
    const { body } = req;
    const { subtaskId } = req.params;
    const updatedSubTask = await _subtasksService.update(subtaskId, body);
    return res.send(updatedSubTask);
  }

  async delete(req, res) {
    const { subtaskId } = req.params;
    const deletedSubTask = await _subtasksService.delete(subtaskId);
    return res.send(deletedSubTask);
  }

  async getTaskSubtasks(req, res) {
    const { taskId } = req.params;
    const subtasks = await _subtasksService.getTaskSubtasks(taskId);
    return res.send(subtasks);
  }

  async create(req, res) {
    const { body } = req;
    const { taskId } = req.params;

    const createdSubTask = await _subtasksService.createSubTask(body, taskId);
    return res.status(201).send(createdSubTask);
  }

  async closeSubTask(req, res) {
    const { subtaskId } = req.params;
    const subTask = await _subtasksService.closeSubTask(subtaskId);
    return res.send(subTask);
  }

  async openSubTask(req, res) {
    const { subtaskId, taskId } = req.params;
    const subTask = await _subtasksService.openSubTask(subtaskId, taskId);
    return res.send(subTask);
  }
}

module.exports = SubtasksController;
