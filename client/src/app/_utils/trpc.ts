import {
  createTRPCProxyClient,
  httpLink,
  createWSClient,
  wsLink,
} from "@trpc/client";
import type { AppRouter } from "../../../../server/src";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: "http://localhost:8000/trpc",
      headers: () => ({
        authorization: sessionStorage.getItem("token") ?? "",
      }),
    }),
    // wsLink({
    //   client: createWSClient({
    //     url: "ws://localhost:8000/trpc",
    //   }),
    // }),
  ],
});
