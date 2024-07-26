/**
 * inyection dependencies container
 */
const { createContainer, asClass, asValue, asFunction } = require("awilix");

/** container that inject dependencies with his register method */
const container = createContainer();

/** Our server class to init app */
const Server = require(".");

/** config file where set and get variables to process env  */
const config = require("../config");

/**
 * Routes layer
 */
const {
  HomeRoutes,
  UserRoutes,
  TaskRoutes,
  SubtasksRoutes,
  AuthRoutes,
  CommentRoutes,
} = require("../routes/index.routes");

/**
 * Controllers layer
 */
const {
  HomeController,
  UserController,
  TaskController,
  SubtasksController,
  AuthController,
  CommentController
} = require("../controllers");

/**
 * Service layer
 */
const {
  HomeService,
  UserService,
  TaskService,
  SubtasksService,
  AuthService,
  CommentService
} = require("../services");

/** Router */
const Router = require("../routes");

/** Models */
const { User, Subtasks, Task,Comment } = require("../models");

/** Repositories */
const {
  UserRepository,
  SubtasksRepository,
  TaskRepository,
  CommentRepository
} = require("../repositories");

container
  .register({ Server: asClass(Server).singleton() })
  .register({ Config: asValue(config) })
  .register({
    Router: asFunction(Router).singleton(),
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    TaskService: asClass(TaskService).singleton(),
    SubtasksService: asClass(SubtasksService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    CommentService: asClass(CommentService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    TaskController: asClass(TaskController.bind(TaskController)).singleton(),
    SubtasksController: asClass(
      SubtasksController.bind(SubtasksController)
    ).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    TaskRoutes: asFunction(TaskRoutes).singleton(),
    SubtasksRoutes: asFunction(SubtasksRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Task: asValue(Task),
    Subtasks: asValue(Subtasks),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    SubtasksRepository: asClass(SubtasksRepository).singleton(),
    TaskRepository: asClass(TaskRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
