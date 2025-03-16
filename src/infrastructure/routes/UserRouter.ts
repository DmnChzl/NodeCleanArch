import UserController from '../controllers/UserController';
import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';
import type { ApplicationRouter } from './ApplicationRouter';
import { RequestMethod } from '../controllers/RequestMethod';

class UserRouter implements ApplicationRouter {
  static PATHNAME = '/api/users';

  constructor(private userController: UserController) {}

  async listener(request: ApplicationRequest, response: ApplicationResponse) {
    const baseUrl = `http://${request.headers.host}`;
    const url = new URL(request.url as string, baseUrl);

    const strictPathName = new RegExp(`^${UserRouter.PATHNAME}$`);
    const pathNameWithId = new RegExp(`^${UserRouter.PATHNAME}/[^/]+$`);

    if (request.method === RequestMethod.Get) {
      if (strictPathName.test(url.pathname)) {
        return this.userController.getAll(request, response);
      }

      if (pathNameWithId.test(url.pathname)) {
        return this.userController.getOne(request, response);
      }
    }

    if (request.method === RequestMethod.Post && strictPathName.test(url.pathname)) {
      return this.userController.createOne(request, response);
    }

    if (request.method === RequestMethod.Put && pathNameWithId.test(url.pathname)) {
      return this.userController.updateOne(request, response);
    }

    if (request.method === RequestMethod.Delete && pathNameWithId.test(url.pathname)) {
      return this.userController.deleteOne(request, response);
    }
  }
}

export default UserRouter;
