import { TestContext } from "vitest";
import { readFile } from "node:fs/promises";
import { MockAgent, MockPool, setGlobalDispatcher } from "undici";
import path from "node:path";

export interface LocalTestContext {
  mock: MockAgent;
  intercept: InstanceType<typeof MockPool>["intercept"];
}

type Context = TestContext & LocalTestContext;

const origin = "https://www.colins.com.tr";

export function setup(context: Context) {
  const mockAgent = new MockAgent();
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);

  const pool = mockAgent.get(origin);

  context.mock ||= mockAgent;
  context.intercept ||= MockPool.prototype.intercept.bind(pool);
}

export async function teardown(context: Context) {
  const pending = context.mock.pendingInterceptors();
  if (!(pending.length === 1 && pending[0].persist === true)) {
    context.mock.assertNoPendingInterceptors();
  }
  await context.mock.close();
}

export async function setupProductMock(context: Context) {
  const mockResponse = await readFile(
    path.join(__dirname, "mock-data", "product.html"),
  );
  context.intercept({
    path: new RegExp("/p/(.*?)"),
    method: "GET",
  }).reply(200, mockResponse.toString());
}
