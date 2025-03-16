import type { ApplicationRequest } from '../providers/ApplicationRequest';

export const bodyParser = <T>(request: ApplicationRequest): Promise<T> => {
  return new Promise((resolve, reject) => {
    let chunks: Uint8Array[] = [];

    request.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    request.on('end', () => {
      const jsonStr = Buffer.concat(chunks).toString();

      if (request.headers['content-type'] === 'application/json') {
        const jsonObj: T = JSON.parse(jsonStr);
        resolve(jsonObj);
      }

      reject(new Error('Content Type Header Is Not Application JSON'));
    });
  });
};
