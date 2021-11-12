import request from "supertest";
import express from "express";
import { mapRouter } from "../routes/mapRoutes";
import { authRouter } from "../routes/authRoutes";
import bodyParser from "body-parser";
import { deleteUser, getAuth } from "@firebase/auth";

const app = require("../app");

test("responds to api/map", async () => {
  app.use("/api", mapRouter);

  const req = {
    lat: -122.338928,
    long: 47.755989,
    radius: 1500,
    type: "brewery",
  };

  const res = await request(app).post("/api/map").send(req);
  expect(res.status).toEqual(200);
});

test("responds to api/map on bad request", async () => {
  app.use("/api", mapRouter);

  const req = {};

  const res = await request(app).post("/api/map").send(req);
  expect(res.status).toEqual(400);
});

test("test user can authenticate", async () => {
  app.use("/auth", authRouter);

  const req = {
    email: "test@test.com",
    password: "password",
  };

  const res = await request(app).post("/auth/login").send(req);

  expect(res.status).toBe(200);
});

test("create and delete new test user", async () => {
  app.use("/auth", authRouter);

  const req = {
    email: "test2@test.com",
    password: "password",
  };

  const res = await request(app).post("/auth/signup").send(req);
  expect(res.status).toBe(200);

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      deleteUser(user);
      console.log("Successfully deleted new user " + req.email);
    } catch (err) {
      console.log(err);
    }
  }
});

it("tries to sign up with an email in-use", async () => {
  app.use("/auth", authRouter);

  const req = {
    email: "test@test.com",
    password: "password",
  };

  const res = await request(app).post("/auth/signup").send(req);
  expect(res.status).toBe(500);
});

it("tries to sign in with an invalid email", async () => {
  app.use("/auth", authRouter);

  const req = {
    email: "test69@test.com",
    password: "password",
  };

  const res = await request(app).post("/auth/login").send(req);
  expect(res.status).toBe(500);
});
