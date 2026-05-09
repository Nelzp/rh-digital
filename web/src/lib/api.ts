import { createFetch } from "@better-fetch/fetch";
import { env } from "./env";
import { getClientToken } from "./get-token-client";
import { getServerToken } from "./get-token-server";

export const api = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  auth: {
    type: "Bearer",
    token: async () => {
      if (typeof window === "undefined") {
        return await getServerToken();
      }

      return getClientToken();
    },
  },
});
