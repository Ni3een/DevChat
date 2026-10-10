import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import {createAdapter} from "@socket.io/redis-streams-adapter"
import Routes from "./routes/index.js";
import {Server} from "socket.io"
import {createServer} from "http"
import { setupSocket } from "./socket.js";
import redis from "./config/redis.config.js"
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";

const app: Application = express();
const server=createServer(app);

// CORS origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://admin.socket.io",
  process.env.FRONTEND_URL || "http://localhost:3000"
];

const io=new Server(server,{
  cors:{
    origin: allowedOrigins,
    credentials:true
  },
  adapter:createAdapter(redis),
});
instrument(io,{
  auth:false,
  mode:"development",
})
setupSocket(io);
export {io}
const PORT = process.env.PORT || 7000;

// CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
};

// * Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});
app.use("/api", Routes);

connectKafkaProducer().catch((err)=>console.log(`Something went wrong while connecting wrong`))
consumeMessages(process.env.KAFKA_TOPIC!).catch((err)=>console.log("consumer error"))
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
