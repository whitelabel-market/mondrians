import { createFetch } from "@vueuse/core";
import type { BeforeFetchContext } from "@vueuse/core";
import { unref } from "vue";
import { API } from "@/utils/constants";

export const createAuthInterface = (address: string) => {
  const xViewerAddress = address;
  const xCsrf = "1";
  let xCsrfToken = "";
  let bearerToken = "";

  const useFetch = createFetch({
    baseUrl: API,
    options: {
      async beforeFetch({ options }: BeforeFetchContext) {
        options.headers = {
          ["x-csrf"]: xCsrf,
          ["x-viewer-address"]: xViewerAddress,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        if (bearerToken)
          options.headers.Authorization = `Bearer ${bearerToken}`;
        if (xCsrfToken) options.headers["x-csrf-token"] = xCsrfToken;
        return { options };
      },
    },
    fetchOptions: {
      mode: "cors",
      credentials: "include",
    },
  });

  const login = async (): Promise<string> => {
    try {
      const { data, error } = await useFetch("login", { timeout: 10000 })
        .post()
        .json();
      if (error.value) {
        throw unref(data);
      }
      const message = unref(data).message;
      xCsrfToken = unref(data).csrfToken;
      if (message) {
        return message;
      }
      throw "No message returned";
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const callback = async (signature: string): Promise<void> => {
    try {
      const { data, error } = await useFetch("callback", { timeout: 10000 })
        .post({ signature })
        .json();
      if (error.value) {
        throw unref(data);
      }
      const jwt = unref(data).jwt;
      if (jwt) {
        bearerToken = jwt;
      } else {
        throw "No bearer token returned";
      }
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const getVoucher = async (): Promise<string> => {
    try {
      const { data, error } = await useFetch("api/whitelist/voucher", {
        timeout: 10000,
      })
        .get()
        .json();
      if (error.value) {
        throw unref(data);
      }
      return unref(data).signature;
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  return {
    login,
    callback,
    getVoucher,
  };
};
