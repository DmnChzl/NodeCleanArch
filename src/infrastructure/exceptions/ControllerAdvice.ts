import { UserConflictError } from '@/core/exceptions/UserConflictError';
import { UserNotFoundError } from '@/core/exceptions/UserNotFoundError';
import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';

class ControllerAdvice {
  static handleException(_request: ApplicationRequest, response: ApplicationResponse) {
    return (error: Error) => {
      response.setHeader('Content-Type', 'application/json');

      if (error instanceof UserNotFoundError) {
        response.statusCode = 404;
        response.end(JSON.stringify({ message: error.message }));
        return;
      }

      if (error instanceof UserConflictError) {
        response.statusCode = 409;
        response.end(JSON.stringify({ message: error.message }));
        return;
      }

      response.statusCode = 500;
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
      return;
    };
  }
}

export default ControllerAdvice;
