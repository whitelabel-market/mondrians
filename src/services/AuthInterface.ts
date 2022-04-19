import { createFetch } from "@vueuse/core";
import type { BeforeFetchContext } from "@vueuse/core";
import { unref } from "vue";

export const createAuthInterface = (address: string) => {
  const xVieverAddress = address;
  const xCsrf = "1";
  let xCsrfToken = "";
  let bearerToken = "";

  const useFetch = createFetch({
    baseUrl: "https://localhost:3000",
    options: {
      async beforeFetch({ options }: BeforeFetchContext) {
        options.headers = {
          ["x-csrf"]: xCsrf,
          ["x-viewer-address"]: xVieverAddress,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        if (bearerToken)
          options.headers.Authorization = `Bearer ${bearerToken}`;
        if (xCsrfToken) options.headers["x-csrf-token"] = xCsrfToken;
        return { options };
      },
      afterFetch(ctx) {
        if (ctx.data.csrfToken) xCsrfToken = ctx.data.csrfToken;
        return ctx;
      },
    },
    fetchOptions: {
      mode: "cors",
      credentials: "include",
    },
  });

  const login = async (): Promise<string> => {
    try {
      const { data } = await useFetch("login").post().json();
      const message = unref(data).message;
      if (message) {
        return message;
      }
      throw new Error("No message returned");
    } catch (e: any) {
      console.error(e.toString());
      throw new Error(e.toString());
    }
  };

  const callback = async (signature: string) => {
    const { data } = await useFetch("callback").post({ signature }).json();
    const jwt = unref(data).jwt;
    if (jwt) {
      bearerToken = jwt;
    } else {
      throw new Error("No bearer token returned");
    }
  };

  const getVoucher = async () => {
    const { data } = await useFetch("api/whitelist/voucher").get().json();
    return unref(data).signature;
  };

  return {
    login,
    callback,
    getVoucher,
  };
};
