import {
  createTRPCProxyClient,
  httpBatchLink,
  createWSClient,
  wsLink,
} from "@trpc/client";
import type { AppRouter } from "../../../../server/src";

export const wsClient = createWSClient({
  url: "ws://localhost:8000/trpc",
});

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    // httpBatchLink({
    //   url: "http://localhost:8000/trpc",
    // }),
    wsLink({
      client: wsClient,
    }),
  ],
});
