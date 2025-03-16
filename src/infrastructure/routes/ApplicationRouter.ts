import type { ApplicationRequest } from '../providers/ApplicationRequest';
import type { ApplicationResponse } from '../providers/ApplicationResponse';

export interface ApplicationRouter {
  listener: (request: ApplicationRequest, response: ApplicationResponse) => Promise<void>;
}
