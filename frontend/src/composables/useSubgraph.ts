import { createFetch, UseFetchOptions, UseFetchReturn } from "@vueuse/core";
import CONFIG from "../../../config";
import { computed, unref } from "vue";

const createSubgraph = createFetch({
  options: {
    timeout: 10000,
    afterFetch(ctx) {
      if (ctx.data?.errors) {
        throw new Error(ctx.data?.errors[0]);
      }
      return ctx;
    },
  },
});

/**
 * useSubgraph
 * @param baseUrl baseUrl
 * @param query query
 * @param variables variables
 * @param options options
 */
export function useSubgraph<T = unknown>(
  baseUrl: string,
  query: string,
  variables: any,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const payload = computed(() =>
    JSON.stringify({
      query,
      variables: unref(variables),
    })
  );

  return createSubgraph<T>(baseUrl, options).post(payload).json();
}

/**
 * useUniswapSubgraph
 * @param query query
 * @param variables variables
 * @param options options
 */
export function useUniswapSubgraph<T = unknown>(
  query: string,
  variables: any = {},
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  return useSubgraph<T>(
    CONFIG.subgraph.uniswapPolygon,
    query,
    variables,
    options
  );
}

/**
 * useMamoSubgraph
 * @param query query
 * @param variables variables
 * @param options options
 */
export function useMamoSubgraph<T = unknown>(
  query: string,
  variables: any = {},
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  return useSubgraph<T>(CONFIG.subgraph.mamo, query, variables, options);
}
