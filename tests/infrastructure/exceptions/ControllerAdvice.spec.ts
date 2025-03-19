import { GenericUserError } from '@/core/exceptions/GenericUserError';
import { UserConflictError } from '@/core/exceptions/UserConflictError';
import { UserNotFoundError } from '@/core/exceptions/UserNotFoundError';
import ControllerAdvice from '@/infrastructure/exceptions/ControllerAdvice';
import { StatusError } from '@/infrastructure/exceptions/StatusError';
import { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ControllerAdvice', () => {
  let incomingMessage: IncomingMessage;
  let serverResponse: ServerResponse;
  let ctrl: ControllerAdvice;

  beforeEach(() => {
    incomingMessage = {} as IncomingMessage;
    serverResponse = new ServerResponse(incomingMessage);
    ctrl = new ControllerAdvice();
  });

  it('should respond with 400 statusCode', () => {
    const endMock = vi.fn();
    serverResponse.end = endMock;

    const handleError = ctrl.exceptionHandler(incomingMessage, serverResponse);
    handleError(new GenericUserError('Invalid User'));

    expect(serverResponse.statusCode).toEqual(400);
    expect(endMock).toHaveBeenCalledWith('{"message":"Invalid User"}');
  });

  it('should respond with 404 statusCode', () => {
    const endMock = vi.fn();
    serverResponse.end = endMock;

    const handleError = ctrl.exceptionHandler(incomingMessage, serverResponse);
    handleError(new UserNotFoundError('28b74urr'));

    expect(serverResponse.statusCode).toEqual(404);
    expect(endMock).toHaveBeenCalledWith('{"message":"User With ID \'28b74urr\' Not Found"}');
  });

  it('should respond with 409 statusCode', () => {
    const endMock = vi.fn();
    serverResponse.end = endMock;

    const handleError = ctrl.exceptionHandler(incomingMessage, serverResponse);
    handleError(new UserConflictError('82p47nrr'));

    expect(serverResponse.statusCode).toEqual(409);
    expect(endMock).toHaveBeenCalledWith('{"message":"Conflict With User ID \'82p47nrr\'"}');
  });

  it('should respond with 418 statusCode', () => {
    const endMock = vi.fn();
    serverResponse.end = endMock;

    const handleError = ctrl.exceptionHandler(incomingMessage, serverResponse);
    handleError(new StatusError("I'm a Teapot", 418));

    expect(serverResponse.statusCode).toEqual(418);
    expect(endMock).toHaveBeenCalledWith('{"message":"I\'m a Teapot"}');
  });

  it('should respond with 500 statusCode', () => {
    const endMock = vi.fn();
    serverResponse.end = endMock;

    const handleError = ctrl.exceptionHandler(incomingMessage, serverResponse);
    handleError(new Error('Default'));

    expect(serverResponse.statusCode).toEqual(500);
    expect(endMock).toHaveBeenCalledWith('{"message":"Internal Server Error"}');
  });
});
