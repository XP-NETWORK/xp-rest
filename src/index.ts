import express from "express";
import cors from "cors";

const app = express();

console.warn("Using Permissive CORS!");

app.use(express.json());

app.use(cors());

app.get("/service/heartbeat", async (req, res) => {
  res.json({
    status: "Up and Running Just Fine.",
  });
});

app.listen("8000", () => {
  console.log(`Express Server Listening @${8000}`);
});
