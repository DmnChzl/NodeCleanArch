import type { UserInput } from '@/core/interfaces/UserInput';
import CreateUser from '@/core/services/CreateUser';
import DeleteUser from '@/core/services/DeleteUser';
import GetAllUsers from '@/core/services/GetAllUsers';
import GetOneUser from '@/core/services/GetOneUser';
import UpdateUser from '@/core/services/UpdateUser';
import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';
import UserRouter from '../routes/UserRouter';
import { bodyParser } from '../utils/index';

class UserController {
  private getAllUsers: GetAllUsers;
  private getOneUser: GetOneUser;
  private createUser: CreateUser;
  private updateUser: UpdateUser;
  private deleteUser: DeleteUser;

  constructor(
    getAllUsers: GetAllUsers,
    getOneUser: GetOneUser,
    createUser: CreateUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser
  ) {
    this.getAllUsers = getAllUsers;
    this.getOneUser = getOneUser;
    this.createUser = createUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async getAll(_request: ApplicationRequest, response: ApplicationResponse) {
    const users = await this.getAllUsers.execute();
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end(JSON.stringify(users));
    return;
  }

  async getOne(request: ApplicationRequest, response: ApplicationResponse) {
    const baseUrl = `http://${request.headers.host}`;
    const url = new URL(request.url as string, baseUrl);

    const pathNameWithId = new RegExp(`^${UserRouter.PATHNAME}/([^/]+)$`);
    const matches = url.pathname.match(pathNameWithId);

    if (!matches) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 400;
      response.end(JSON.stringify({ message: `Cannot Get ${UserRouter.PATHNAME}` }));
      return;
    }

    const [_input, id] = matches;
    const result = await this.getOneUser.execute(id);

    if (result.isLeft()) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = result.error.statusCode;
      response.end(JSON.stringify({ message: result.error.message }));
      return;
    }

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end(JSON.stringify(result.value));
    return;
  }

  async createOne(request: ApplicationRequest, response: ApplicationResponse) {
    const body = await bodyParser<UserInput>(request);
    const result = await this.createUser.execute(body);

    if (result.isLeft()) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = result.error.statusCode;
      response.end(JSON.stringify({ message: result.error.message }));
      return;
    }

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 201;
    response.end(JSON.stringify(result.value));
    return;
  }

  async updateOne(request: ApplicationRequest, response: ApplicationResponse) {
    const baseUrl = `http://${request.headers.host}`;
    const url = new URL(request.url as string, baseUrl);

    const pathNameWithId = new RegExp(`^${UserRouter.PATHNAME}/([^/]+)$`);
    const matches = url.pathname.match(pathNameWithId);

    if (!matches) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 400;
      response.end(JSON.stringify({ message: `Cannot Get ${UserRouter.PATHNAME}` }));
      return;
    }

    const [_input, id] = matches;
    const body = await bodyParser<UserInput>(request);
    const result = await this.updateUser.execute(id, body);

    if (result.isLeft()) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = result.error.statusCode;
      response.end(JSON.stringify({ message: result.error.message }));
      return;
    }

    response.statusCode = 200;
    response.end();
    return;
  }

  async deleteOne(request: ApplicationRequest, response: ApplicationResponse) {
    const baseUrl = `http://${request.headers.host}`;
    const url = new URL(request.url as string, baseUrl);

    const pathNameWithId = new RegExp(`^${UserRouter.PATHNAME}/([^/]+)$`);
    const matches = url.pathname.match(pathNameWithId);

    if (!matches) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 400;
      response.end(JSON.stringify({ message: `Cannot Get ${UserRouter.PATHNAME}` }));
      return;
    }

    const [_input, id] = matches;
    const result = await this.deleteUser.execute(id);

    if (result.isLeft()) {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = result.error.statusCode;
      response.end(JSON.stringify({ message: result.error.message }));
      return;
    }

    response.statusCode = 204;
    response.end();
    return;
  }
}

export default UserController;
