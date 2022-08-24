import { createFetch } from "@vueuse/core";
import type { BeforeFetchContext } from "@vueuse/core";
import { ref, unref } from "vue";
import CONFIG from "../../../config";
export interface AuthInterface {
  login: () => Promise<string | undefined>;
  callback: (signature: string) => Promise<void>;
  getVoucher: () => Promise<string>;
  sendMail: (email: string) => Promise<void>;
  print: (printData: any) => Promise<void>;
  reset: () => void;
}

export let authInterface: AuthInterface;
export const printedTokens = ref<string[]>([]);

export const createAuthInterface = (address: string) => {
  const xViewerAddress = address;
  const xCsrf = "1";
  let xCsrfToken = "";
  let bearerToken = "";

  const useFetch = createFetch({
    baseUrl: CONFIG.backend.url,
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

  const login = async (): Promise<string | undefined> => {
    try {
      const { data, error } = await useFetch("login", { timeout: 10000 })
        .post()
        .json();
      if (error.value) {
        throw unref(data);
      }
      const message = unref(data)?.message;
      xCsrfToken = unref(data)?.csrfToken;
      bearerToken = unref(data)?.jwt;
      if (bearerToken) {
        getPrintedTokens();
        return;
      }
      if (message) return message;
    } catch (e: any) {
      throw new Error(e);
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
        getPrintedTokens();
      } else {
        throw "No bearer token returned";
      }
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const getVoucher = async (): Promise<string> => {
    try {
      const { data, error } = await useFetch("v1/whitelist/voucher", {
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

  const sendMail = async (email: string): Promise<void> => {
    const { error } = await useFetch(`v1/whitelist/email`).post({
      email,
    });
    if (error.value) {
      throw unref(error.value);
    }
  };

  const print = async (printData: any): Promise<void> => {
    const { error } = await useFetch(`v1/print/order`).post(printData);
    if (error.value) {
      throw unref(error.value);
    }
  };

  const getPrintedTokens = async (): Promise<void> => {
    const { data, error } = await useFetch(`v1/print/tokens`).get().json();
    if (error.value) {
      throw unref(data);
    }
    printedTokens.value = unref(data)?.tokens;
  };

  const reset = () => {
    xCsrfToken = "";
    bearerToken = "";
  };

  authInterface = {
    login,
    callback,
    getVoucher,
    sendMail,
    print,
    reset,
  };
};
