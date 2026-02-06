import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./database/mongoDB.js";

//ENV config
dotenv.config();

//connect Database
connectDb(process.env.DATABASE_URI!);

//Cors Origins
const CORS_ORIGIN = ["http://localhost:3000"];

// Express App config
const app = express();
app.use(express.json());
app.use("/public/uploads", express.static("public/uploads"));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

//Routes

app.listen(process.env.PORT, () => {
  console.log("Http Server is listening at", process.env.PORT);
});
