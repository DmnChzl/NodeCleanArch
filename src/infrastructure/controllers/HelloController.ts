import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';

class HelloController {
  message(_request: ApplicationRequest, response: ApplicationResponse) {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end(JSON.stringify({ message: 'Hi!' }));
    return;
  }
}

export default HelloController;
