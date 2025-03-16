import { IncomingMessage, ServerResponse } from 'node:http';

export type ApplicationResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };
