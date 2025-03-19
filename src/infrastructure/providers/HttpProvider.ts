import type { Server } from 'node:http';
import type { ApplicationRouter } from '../routes/ApplicationRouter';
import type { ApplicationResponse } from './ApplicationResponse';
import type { ApplicationRequest } from './ApplicationRequest';

class HttpProvider {
  constructor(private server: Server) {}

  static handleListeners = (...routers: ApplicationRouter[]) => {
    return async (request: ApplicationRequest, response: ApplicationResponse) => {
      for (const router of routers) {
        await router.listener(request, response);
      }

      try {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 400;
        response.end(JSON.stringify({ message: "Cannot Get '/'" }));
      } catch {
        console.log('Ignored Default Behavior');
      }
    };
  };

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server Is Runnin' On Port ${port}`);
    });
  }

  stop() {
    this.server.close(() => {
      console.log('Server Is Shutting Down...');
    });
  }
}

export default HttpProvider;
