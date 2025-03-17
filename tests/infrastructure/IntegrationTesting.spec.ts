import CreateUser from '@/core/use-cases/CreateUser';
import DeleteUser from '@/core/use-cases/DeleteUser';
import GetAllUsers from '@/core/use-cases/GetAllUsers';
import GetOneUser from '@/core/use-cases/GetOneUser';
import UpdateUser from '@/core/use-cases/UpdateUser';
import UserRepositoryAdapter from '@/infrastructure/adapters/UserRepositoryAdapter';
import UserController from '@/infrastructure/controllers/UserController';
import UserManagement from '@/infrastructure/persistence/UserManagement';
import HttpProvider from '@/infrastructure/providers/HttpProvider';
import UserRouter from '@/infrastructure/routes/UserRouter';
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Integration Testing', () => {
  let httpProvider: HttpProvider;

  beforeAll(() => {
    const database = new DatabaseSync(':memory:');

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

    const requestHandler = HttpProvider.handleListeners(userRouter);

    const server = createServer(requestHandler);
    httpProvider = new HttpProvider(server);

    httpProvider.start(9090);
  });

  afterAll(() => {
    httpProvider.stop();
  });

  it("should fetch '/api/users'", async () => {
    const userInput = { firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' };

    const postResponse = await fetch('http://localhost:9090/api/users', {
      body: JSON.stringify(userInput),
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    const userOuput = await postResponse.json();

    const response = await fetch(`http://localhost:9090/api/users/${userOuput.id}`);
    expect(await response.json()).toEqual(userOuput);
  });
});
