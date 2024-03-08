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

describe("Test user endpoints", () => {
  it("should create user for valid input", async () => {
    return request(app)
      .post("/users/register")
      .send({ email: "hello@hello.com", password: "Idon'ttellyou" })
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeTruthy();
      });
  });
  it("should throw user already exists exception for user user details", async () => {
    return request(app)
      .post("/users/register")
      .send({ email: "hello@hello.com", password: "Idon'ttellyou" })
      .expect(409);
  });
  it("should login and return access token for valid user", async () => {
    return request(app)
      .post("/users/login")
      .send({ email: "hello@hello.com", password: "Idon'ttellyou" })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy();
      });
  });
  it("should throw exception for invalid user credentials", async () => {
    return request(app).post("/users/login").send({ email: "hello@hello.com", password: "Icantellyou" }).expect(401);
  });
});
