import request from "supertest";
import { createApp } from "../../src/createApp";
import { startServer } from "../../src/server";
import { Application } from "express";
import mongoose from "mongoose";

let app: Application;
beforeAll(() => {
  app = createApp();
  startServer(app);
});
afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Test notes endpoints", () => {
  it("should throw error if no accessToken provided", async () => {
    return request(app).post("/notes").send({ title: "first note", content: "my first note content" }).expect(400);
  });
});
