import HelloController from '@/infrastructure/controllers/HelloController';
import { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HelloController', () => {
  let ctrl: HelloController;
  let serverResponse: ServerResponse;

  beforeEach(() => {
    ctrl = new HelloController();
    serverResponse = new ServerResponse({} as IncomingMessage);
  });

  it('should setHeader', () => {
    const setHeaderMock = vi.fn();
    const endMock = vi.fn();
    serverResponse.setHeader = setHeaderMock;
    serverResponse.end = endMock;

    ctrl.message({} as IncomingMessage, serverResponse);

    expect(setHeaderMock).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(serverResponse.statusCode).toEqual(200);
    expect(endMock).toHaveBeenCalledWith('{"message":"Hi!"}');
  });
});
