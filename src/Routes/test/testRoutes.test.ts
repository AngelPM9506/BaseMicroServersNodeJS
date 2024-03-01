import request from "supertest";
import ServerApp from "@Server/index";

const serverApp = new ServerApp({});
const app = serverApp.getServer();

describe("Test Route testing", () => {
  it("Shuld test /v1/test is working", async () => {
    const response = await request(app).get("/v1/test");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Ruta de prueba");
  });
});
