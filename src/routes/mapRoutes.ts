import express from "express";
import { getAndReturnPlaces } from "../controllers/mapController";

export const mapRouter = express.Router();

mapRouter.post("/map", getAndReturnPlaces);