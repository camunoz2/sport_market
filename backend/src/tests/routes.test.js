import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import { HOST, PORT } from "../../server";

const BACKEND_URL = `${HOST}:${PORT}`;

describe("Pagina inicio", () => {
  test("GET /", async () => {
    const response = await request(BACKEND_URL).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("API home funcionando");
  });
});

describe("API Tests", () => {
  test("POST /api/login", async () => {
    const response = await request(BACKEND_URL).post("/api/login").send({
      email: "test@test.com",
      password: "1234",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.email).toBe("test@test.com");
    expect(response.body.name).toBe("Pedro");
  });
});

describe("API Categories", () => {
  test("GET /api/categories", async () => {
    const response = await request(BACKEND_URL).get("/api/categories");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("categories");
  });
});

describe("API Test db", () => {
  test("GET /api/test-db", async () => {
    const response = await request(BACKEND_URL).get("/api/test-db");
    expect(response.statusCode).toBe(200);
  });
});
