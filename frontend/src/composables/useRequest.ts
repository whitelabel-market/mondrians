import {
  BeforeFetchContext,
  createFetch,
  isObject,
  MaybeRef,
  UseFetchOptions,
  UseFetchReturn,
} from "@vueuse/core";
import { computed, unref } from "vue";
import { LocationQueryRaw, stringifyQuery } from "vue-router";
import { useUserStore } from "@/store/modules/user";

import CONFIG from "../../../config";
import { storeToRefs } from "pinia";

interface UseRequestOptionsQuery extends UseFetchOptions {
  query?: MaybeRef<unknown>;
}

interface UseRequestOptionsPayload extends UseFetchOptions {
  payload?: MaybeRef<unknown>;
}

const useRequest = createFetch({
  baseUrl: CONFIG.backend.url,
  options: {
    timeout: 10000,
    async beforeFetch({ options }: BeforeFetchContext) {
      const { xCsrf, xViewerAddress, xCsrfToken, bearerToken } = storeToRefs(
        useUserStore()
      );

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ["x-csrf"]: xCsrf.value,
        ["x-viewer-address"]: xViewerAddress.value,
        ["x-csrf-token"]: xCsrfToken.value ?? null,
        Authorization: bearerToken.value ? `Bearer ${bearerToken.value}` : null,
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
 * @param options options
 */
export function useGet<T = unknown>(
  url: MaybeRef<string>,
  options: UseRequestOptionsQuery = {}
): UseFetchReturn<T> {
  const { query, ...requestOptions } = options;
  const _url = computed(() => {
    const _url = unref(url);
    const _query = unref(query);
    const queryString = isObject(_query)
      ? stringifyQuery(_query as LocationQueryRaw)
      : _query || "";
    return `${_url}${queryString ? "?" : ""}${queryString}`;
  });

  return useRequest<T>(_url, requestOptions).json();
}

/**
 * post
 * @param url url
 * @param options options
 */
export function usePost<T = unknown>(
  url: MaybeRef<string>,
  options: UseRequestOptionsPayload = {}
): UseFetchReturn<T> {
  const { payload, ...requestOptions } = options;
  return useRequest<T>(url, requestOptions).post(payload).json();
}

/**
 * put
 * @param url url
 * @param options options
 */
export function usePut<T = unknown>(
  url: MaybeRef<string>,
  options: UseRequestOptionsPayload = {}
): Promise<UseFetchReturn<T>> {
  const { payload, ...requestOptions } = options;
  return useRequest<T>(url, requestOptions).put(payload).json().execute();
}

/**
 * delete
 * @param url url
 * @param options options
 */
export function useDelete<T = unknown>(
  url: MaybeRef<string>,
  options: UseRequestOptionsPayload = {}
): Promise<UseFetchReturn<T>> {
  const { payload, ...requestOptions } = options;
  return useRequest<T>(url, requestOptions).delete(payload).json().execute();
}
