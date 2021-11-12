import { Request, Response, NextFunction } from "express";
import axios, { AxiosRequestConfig } from "axios";
require("dotenv").config();

interface ResponseDataProps {
  next_page_token?: string;
  html_attributions?: any[];
  results: any[];
  status: string;
}

export const getAndReturnPlaces = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lat, long, radius, type } = req.body;
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${long}%2C${lat}&radius=${radius}&type=${type}&key=${process.env.MAP_DEV_API_KEY}`,
    headers: {},
  };
  axios(config)
    .then((response) => {
      const responseData: ResponseDataProps = response.data;
      if (responseData.status !== "INVALID_REQUEST") {
        res.status(response.status).json({ message: response.data });
      } else {
        throw Error;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Invalid request" });
    });
};
