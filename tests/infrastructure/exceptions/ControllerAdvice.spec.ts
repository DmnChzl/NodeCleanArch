import { UserConflictError } from '@/core/exceptions/UserConflictError';
import { UserNotFoundError } from '@/core/exceptions/UserNotFoundError';
import ControllerAdvice from '@/infrastructure/exceptions/ControllerAdvice';
import { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ControllerAdvice', () => {
  let serverResponse: ServerResponse;

  beforeEach(() => {
    serverResponse = new ServerResponse({} as IncomingMessage);
  });

  it('should respond with 404 statusCode', () => {
    const setHeaderMock = vi.fn();
    const endMock = vi.fn();
    serverResponse.setHeader = setHeaderMock;
    serverResponse.end = endMock;

    const errorHandler = ControllerAdvice.handleException({} as IncomingMessage, serverResponse);
    errorHandler(new UserNotFoundError('28b74urr'));

    expect(serverResponse.statusCode).toEqual(404);
    expect(endMock).toHaveBeenCalledWith('{"message":"User With ID \'28b74urr\' Not Found"}');
  });

  it('should respond with 500 statusCode', () => {
    const setHeaderMock = vi.fn();
    const endMock = vi.fn();
    serverResponse.setHeader = setHeaderMock;
    serverResponse.end = endMock;

    const errorHandler = ControllerAdvice.handleException({} as IncomingMessage, serverResponse);
    errorHandler(new UserConflictError('82p47nrr'));

    expect(serverResponse.statusCode).toEqual(409);
    expect(endMock).toHaveBeenCalledWith('{"message":"Conflict With User ID \'82p47nrr\'"}');
  });

  it('should respond with 500 statusCode', () => {
    const setHeaderMock = vi.fn();
    const endMock = vi.fn();
    serverResponse.setHeader = setHeaderMock;
    serverResponse.end = endMock;

    const errorHandler = ControllerAdvice.handleException({} as IncomingMessage, serverResponse);
    errorHandler(new Error('Default'));

    expect(serverResponse.statusCode).toEqual(500);
    expect(endMock).toHaveBeenCalledWith('{"message":"Internal Server Error"}');
  });
});
