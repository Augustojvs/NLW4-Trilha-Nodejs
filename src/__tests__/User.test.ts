import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll((async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  }));

  it("Shold be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user1@exemplo.com",
      name: "User Exemplo1"
    });

    expect(response.status).toBe(201);
  });

  it("Shold not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@exemplo.com",
      name: "User Exemplo"
    });

    expect(response.status).toBe(400);
  })
});