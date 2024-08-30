import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { HelloWorldController } from "./HelloWorldController";
import { Server } from "../../Server";

describe("HelloWorldController", () => {
  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [HelloWorldController]
    }
  }));
  afterEach(PlatformTest.reset);

  it("should call GET /hello-world", async () => {
     const request = SuperTest(PlatformTest.callback());
     const response = await request.get("/hello-world").expect(200);

     expect(response.text).toEqual("hello");
  });
});
