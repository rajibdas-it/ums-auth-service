import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "ums auth service is running",
  });
});

export default app;
