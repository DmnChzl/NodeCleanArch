import { createServer } from 'node:http';
import CreateUser from './core/use-cases/CreateUser';
import DeleteUser from './core/use-cases/DeleteUser';
import GetAllUsers from './core/use-cases/GetAllUsers';
import GetOneUser from './core/use-cases/GetOneUser';
import UpdateUser from './core/use-cases/UpdateUser';
// import InMemoryUserRepository from './infrastructure/adapters/InMemoryUserRepository';
import { DatabaseSync } from 'node:sqlite';
import UserRepositoryAdapter from './infrastructure/adapters/UserRepositoryAdapter';
import config from './infrastructure/config';
import HelloController from './infrastructure/controllers/HelloController';
import UserController from './infrastructure/controllers/UserController';
import UserManagement from './infrastructure/persistence/UserManagement';
import HttpProvider from './infrastructure/providers/HttpProvider';
import HelloRouter from './infrastructure/routes/HelloRouter';
import UserRouter from './infrastructure/routes/UserRouter';

const helloController = new HelloController();
const helloRouter = new HelloRouter(helloController);

const database = new DatabaseSync(config.dbPath);

// const userRepository = new InMemoryUserRepository();
const userManagement = new UserManagement(database);
const userRepository = new UserRepositoryAdapter(userManagement);

const getAllUsersUseCase = new GetAllUsers(userRepository);
const getOneUserUseCase = new GetOneUser(userRepository);
const createUserUseCase = new CreateUser(userRepository);
const updateUserUseCase = new UpdateUser(userRepository);
const deleteUserUseCase = new DeleteUser(userRepository);

const userController = new UserController(
  getAllUsersUseCase,
  getOneUserUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase
);
const userRouter = new UserRouter(userController);

const requestHandler = HttpProvider.handleListeners(helloRouter, userRouter);

const server = createServer(requestHandler);
const app = new HttpProvider(server);

app.start(config.port);
