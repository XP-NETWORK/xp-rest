import { config } from "dotenv";

config();

export default {
  port: parseInt(process.env.PORT!),
}