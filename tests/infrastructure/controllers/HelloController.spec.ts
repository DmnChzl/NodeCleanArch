import HelloController from '@/infrastructure/controllers/HelloController';
import { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HelloController', () => {
  let ctrl: HelloController;

  beforeEach(() => {
    ctrl = new HelloController();
  });

  it('should write the header', () => {
    const incomingMessage = {} as IncomingMessage;
    const serverResponse = new ServerResponse(incomingMessage);

    const setHeaderMock = vi.fn();
    const endMock = vi.fn();
    serverResponse.setHeader = setHeaderMock;
    serverResponse.end = endMock;

    ctrl.greeting(incomingMessage, serverResponse);

    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(serverResponse.statusCode).toEqual(200);
    expect(endMock).toHaveBeenCalledWith('{"message":"Hi!"}');
  });
});
