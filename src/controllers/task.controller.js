let _taskService = null;
class IdeaController {
  constructor({ TaskService }) {
    _taskService = TaskService;
  }

  async get(req, res) {
    const { taskId } = req.params;
    const task = await _taskService.get(taskId);
    return res.send(task);
  }

  async getAll(req, res) {
    const { pageSize, pageNumber } = req.query;
    const ideas = await _taskService.getAll(pageSize, pageNumber);
    return res.send(ideas);
  }

  async create(req, res) {
    const { body } = req;
    const createdIdea = await _taskService.create(body);
    return res.status(201).send(createdIdea);
  }

  async update(req, res) {
    const {body} = req;
    const { taskId } = req.params;
    const updatedIdea = await _taskService.update(taskId, body);
    return res.send(updatedIdea);
  }

  async delete(req, res) {
    const { taskId } = req.params;
    const deletedIdea = await _taskService.delete(taskId);
    return res.send(deletedIdea);
  }

  async getUserTasks(req, res) {
    const { userId } = req.params;

    const ideas = await _taskService.getUserTasks(userId);
    return res.send(ideas);
  }

  async closeTask(req, res) {
    const { taskId } = req.params;
    const task = await _taskService.closeTask(taskId);
    return res.send(task);
  }
  async openTask(req, res) {
    const { taskId } = req.params;
    const task = await _taskService.openTask(taskId);
    return res.send(task);
  }

}

module.exports = IdeaController;
