import express from "express";
import cors from "cors";
import WebSocket from "ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./routes";

const app = express();
const port = 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

const server = app.listen(port, () => {
  console.log(`Server listening http on port ${port}`);
});

// Websockets server -----------------

applyWSSHandler({
  wss: new WebSocket.Server({
    server,
  }),
  router: appRouter,
});

export type AppRouter = typeof appRouter;
