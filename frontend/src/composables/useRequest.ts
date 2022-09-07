import {
  BeforeFetchContext,
  createFetch,
  isObject,
  MaybeRef,
  UseFetchReturn,
} from "@vueuse/core";
import { computed, unref } from "vue";
import { LocationQueryRaw, stringifyQuery } from "vue-router";
import { useUserStoreWithOut } from "@/store/modules/user";

import CONFIG from "../../../config";

const useRequest = createFetch({
  baseUrl: CONFIG.backend.url,
  options: {
    timeout: 10000,
    immediate: false,
    async beforeFetch({ options, cancel }: BeforeFetchContext) {
      const { xCsrf, xViewerAddress, xCsrfToken, bearerToken } =
        useUserStoreWithOut();

      if (!xCsrfToken && !bearerToken) {
        cancel();
      }
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ["x-csrf"]: xCsrf,
        ["x-viewer-address"]: xViewerAddress,
        ["x-csrf-token"]: xCsrfToken ?? null,
        Authorization: bearerToken ? `Bearer ${bearerToken}` : null,
      };
      Object.assign(options.headers, headers);
      return { options };
    },
  },
  fetchOptions: {
    mode: "cors",
    credentials: "include",
  },
});

/**
 * get
 * @param url url
 * @param query query
 */
export function useGet<T = unknown>(
  url: MaybeRef<string>,
  query?: MaybeRef<unknown>
): Promise<UseFetchReturn<T>> {
  const _url = computed(() => {
    const _url = unref(url);
    const _query = unref(query);
    const queryString = isObject(_query)
      ? stringifyQuery(_query as LocationQueryRaw)
      : _query || "";
    return `${_url}${queryString ? "?" : ""}${queryString}`;
  });

  return useRequest<T>(_url).json().execute();
}

/**
 * post
 * @param url url
 * @param payload payload
 */
export function usePost<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): Promise<UseFetchReturn<T>> {
  return useRequest<T>(url).post(payload).json().execute();
}

/**
 * put
 * @param url url
 * @param payload payload
 */
export function usePut<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): Promise<UseFetchReturn<T>> {
  return useRequest<T>(url).put(payload).json().execute();
}

/**
 * delete
 * @param url url
 * @param payload payload
 */
export function useDelete<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): Promise<UseFetchReturn<T>> {
  return useRequest<T>(url).delete(payload).json().execute();
}
