import { TestContext } from 'vitest';
import { readFile } from 'node:fs/promises';
import { MockAgent, MockPool, setGlobalDispatcher } from 'undici';

export interface LocalTestContext {
  mock: MockAgent;
  intercept: InstanceType<typeof MockPool>['intercept'];
}

type Context = TestContext & LocalTestContext;

export function createTestContext(origin: string, mockDataPath: string) {
  return {
    setup(context: Context) {
      const mockAgent = new MockAgent();
      mockAgent.disableNetConnect();
      setGlobalDispatcher(mockAgent);

      const pool = mockAgent.get(origin);

      context.mock ||= mockAgent;
      context.intercept ||= MockPool.prototype.intercept.bind(pool);
    },

    async teardown(context: Context) {
      const pending = context.mock.pendingInterceptors();
      if (!(pending.length === 1 && pending[0].persist === true)) {
        context.mock.assertNoPendingInterceptors();
      }
      await context.mock.close();
    },

    async setupProductMock(context: Context) {
      const mockResponse = await readFile(mockDataPath);

      context
        .intercept({
          path: new RegExp('/(.*?)'),
          method: 'GET',
        })
        .reply(200, mockResponse.toString());
    },
  };
}
