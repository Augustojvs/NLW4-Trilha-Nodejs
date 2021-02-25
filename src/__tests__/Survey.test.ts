import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Shold be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title exemplo",
      description: "Description Exemplo"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Shold be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title exemplo2",
      description: "Description Exemplo2"
    });

    const response = await request(app).get("/surveys");

    expect(response.body.lenght).toBe(2);
  })

});