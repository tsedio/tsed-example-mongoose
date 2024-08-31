import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../Server";

describe("IndexCtrl", () => {
  beforeAll(PlatformTest.bootstrap(Server));
  afterAll(PlatformTest.reset);

  // then run your test
  describe("GET /", () => {
    it("should index page", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request.get("/").expect(200);

      expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8");
      expect(response.text).toEqual("");
    });
  });
});
