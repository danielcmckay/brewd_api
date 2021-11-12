import express from "express";
import { mapRouter } from "./routes/mapRoutes";
import bodyParser, { json } from "body-parser";
import { firebaseApp } from "./utils/firebase";
import { authRouter } from "./routes/authRoutes";

const app = express();
var jsonParser = bodyParser.json();
const DEV_PORT = 8000;

const firebase = firebaseApp();

app.use("/api", jsonParser, mapRouter);
app.use("/auth", jsonParser, authRouter);

module.exports = app;
