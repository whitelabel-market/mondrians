import { ref, inject } from "vue";
import type { Ref } from "vue";
import { useFetch } from "@vueuse/core";
import CONFIG from "../../../config";
import { getTokenHourData } from "@/services/graphql/types";

export const CURRENCY_CONTEXT = Symbol();

export interface UseCurrency {
  maticToUsd: (matic: string | number, fractionDigits?: number) => string;
  usdToMatic: (matic: string | number, fractionDigits?: number) => string;
  maticPrice: Ref<string>;
  currencyReady: Ref<boolean>;
  currencyError: Ref<Error | undefined>;
}

export function createCurrency(): UseCurrency {
  const defaultFractionDigits = 2;
  const maticPrice = ref("0.00");

  const {
    data,
    error: currencyError,
    isFinished: currencyReady,
    onFetchResponse,
  } = useFetch(CONFIG.subgraph.uniswapPolygon, {
    timeout: 10000,
  })
    .post(
      JSON.stringify({
        query: getTokenHourData,
      })
    )
    .json();

  onFetchResponse(() => {
    if (data?.value?.data?.tokenHourDatas?.length) {
      maticPrice.value = String(data.value.data.tokenHourDatas[0].close);
    }
  });

  const maticToUsd = function (
    matic: string | number,
    fractionDigits = defaultFractionDigits
  ) {
    return (Number(matic) * Number(maticPrice.value)).toFixed(fractionDigits);
  };

  const usdToMatic = function (
    usd: string | number,
    fractionDigits = defaultFractionDigits
  ) {
    return (Number(usd) / Number(maticPrice.value)).toFixed(fractionDigits);
  };

  return {
    maticToUsd,
    usdToMatic,
    maticPrice,
    currencyReady,
    currencyError,
  };
}

export function useCurrency(): UseCurrency {
  const context = inject(CURRENCY_CONTEXT) as UseCurrency;

  if (!context) {
    throw new Error("useCurrency must be used with createCurrency");
  }

  return context;
}
