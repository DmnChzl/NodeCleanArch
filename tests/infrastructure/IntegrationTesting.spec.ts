import type { UserOutput } from '@/core/interfaces/UserOutput';
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
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

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

  afterEach(async () => {
    const users: UserOutput[] = await fetch('http://localhost:9090/api/users').then(resp => resp.json());

    for (const user of users) {
      await fetch(`http://localhost:9090/api/users/${user.id}`, { method: 'DELETE' });
    }
  });

  afterAll(() => {
    httpProvider.stop();
  });

  it('should create new user', async () => {
    const userInput = { firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' };

    const { id: userId } = await fetch('http://localhost:9090/api/users', {
      body: JSON.stringify(userInput),
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(resp => resp.json());

    const result = await fetch(`http://localhost:9090/api/users/${userId}`).then(resp => resp.json());

    const userOutput = { id: userId, fullName: 'John Doe', email: 'john.doe@pm.me' };
    expect(result).toEqual(userOutput);
  });

  it('should update existing user', async () => {
    const { id: userId } = await fetch('http://localhost:9090/api/users', {
      body: JSON.stringify({ firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' }),
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(resp => resp.json());

    const userInput = { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@pm.me' };

    await fetch(`http://localhost:9090/api/users/${userId}`, {
      body: JSON.stringify(userInput),
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const result = await fetch(`http://localhost:9090/api/users/${userId}`).then(resp => resp.json());

    const userOutput = { id: userId, fullName: 'Jane Doe', email: 'jane.doe@pm.me' };
    expect(result).toEqual(userOutput);
  });

  it('should delete existing user', async () => {
    const { id: userId } = await fetch('http://localhost:9090/api/users', {
      body: JSON.stringify({ firstName: 'John', lastName: 'Doe', email: 'john.doe@pm.me' }),
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(resp => resp.json());

    await fetch(`http://localhost:9090/api/users/${userId}`, { method: 'DELETE' });

    const result = await fetch(`http://localhost:9090/api/users/${userId}`).then(resp => resp.json());
    expect(result).toEqual({ message: `User With ID '${userId}' Not Found` });
  });
});
