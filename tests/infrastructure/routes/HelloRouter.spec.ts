import HelloController from '@/infrastructure/controllers/HelloController';
import HelloRouter from '@/infrastructure/routes/HelloRouter';
import { IncomingMessage, ServerResponse } from 'node:http';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HelloRouter', () => {
  let ctrl: HelloController;
  let router: HelloRouter;

  beforeEach(() => {
    ctrl = new HelloController();
    router = new HelloRouter(ctrl);
  });

  it('should call the listener', () => {
    const incomingMessage = {
      headers: {
        host: '127.0.0.1:8080'
      },
      method: 'GET',
      url: '/api/hello'
    } as IncomingMessage;
    const serverResponse = new ServerResponse(incomingMessage);

    const messageMock = vi.fn();
    ctrl.greeting = messageMock;

    router.listener(incomingMessage, serverResponse);
    expect(messageMock).toHaveBeenCalled();
  });
});
