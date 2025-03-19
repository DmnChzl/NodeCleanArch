import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';
import type { ApplicationRouter } from './ApplicationRouter';
import type HelloController from '../controllers/HelloController';
import { RequestMethod } from '../controllers/RequestMethod';

class HelloRouter implements ApplicationRouter {
  static PATHNAME = '/api/hello';

  constructor(private helloController: HelloController) {}

  async listener(request: ApplicationRequest, response: ApplicationResponse) {
    const baseUrl = `http://${request.headers.host}`;
    const url = new URL(request.url as string, baseUrl);

    const strictPathName = new RegExp(`^${HelloRouter.PATHNAME}$`);

    if (request.method === RequestMethod.Get && strictPathName.test(url.pathname)) {
      return this.helloController.greeting(request, response);
    }
  }
}

export default HelloRouter;
