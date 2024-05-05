import express from "express";
import cors from "cors";
import WebSocket from "ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./routes";
import { createContext } from "./context";

const app = express();
const port = 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ... all your express http endpoints

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

const server = app.listen(port, () => {
  console.log(`Server listening http on port ${port}`);
});

/*
  Websockets server
  For websocket implementation, you need modify createContext and some changes here.
  Please refer to trpc docs for implmentation.
  I couldn't keep the my changes for both http and ws, as they might mess up.
*/

/*
applyWSSHandler({
  wss: new WebSocket.Server({
    server,
  }),
  router: appRouter,
});
*/

export type AppRouter = typeof appRouter;
