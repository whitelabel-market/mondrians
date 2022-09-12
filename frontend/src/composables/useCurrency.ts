import { ref, inject, computed } from "vue";
import type { Ref } from "vue";
import { useFetch } from "@vueuse/core";
import CONFIG from "../../../config";
import { getTokenHourData } from "@/services/graphql/types";
import { useUniswapSubgraph } from "@/composables/useSubgraph";

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

  const {
    data,
    error: currencyError,
    isFinished: currencyReady,
  } = useUniswapSubgraph<any>(getTokenHourData);

  const maticPrice = computed(() =>
    data?.value?.data?.tokenHourDatas?.length
      ? data.value.data.tokenHourDatas[0].close
      : "0.00"
  );

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
