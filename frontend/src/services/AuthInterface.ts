import { createFetch } from "@vueuse/core";
import type { BeforeFetchContext } from "@vueuse/core";
import { unref } from "vue";
import { API } from "@/utils/constants";

export interface AuthInterface {
  login: () => Promise<string>;
  callback: (signature: string) => Promise<void>;
  getVoucher: () => Promise<string>;
  sendMail: (email: string) => Promise<void>;
  print: (printData: any) => Promise<void>;
  reset: () => void;
}

export let authInterface: AuthInterface;

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
      if (unref(data)?.jwt) {
        bearerToken = unref(data)?.jwt;
      }
      if (message) {
        return message;
      }
      return "";
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
      console.log("got data", data);
      return unref(data).signature;
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const sendMail = async (email: string): Promise<void> => {
    try {
      const { data, error } = await useFetch(`api/whitelist/email`, {
        timeout: 10000,
      }).post({ email });
      if (error.value) {
        throw unref(data);
      }
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const print = async (printData: any): Promise<void> => {
    try {
      const { data, error } = await useFetch(`api/print`, {
        timeout: 10000,
      }).post(printData);
      if (error.value) {
        throw unref(data);
      }
    } catch (e: any) {
      throw new Error(e.toString());
    }
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
