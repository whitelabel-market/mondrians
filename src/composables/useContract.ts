import { computed, isRef, readonly, ref } from "vue";
import { MaybeRef } from "@vueuse/core";
import type { Contract } from "@/utils/types";

const contract = ref<Contract>({
  id: "",
  maxSupply: 0,
  totalSupply: 0,
  maxReserved: 0,
  supportsMetadata: false,
  name: "",
  paused: false,
  symbol: "",
});

export default function useContract() {
  const isPaused = computed<boolean>(() => !!contract.value.paused);

  const setContract = (v: MaybeRef<Contract>) => {
    contract.value = isRef(v) ? v.value : v;
  };

  return {
    contract: readonly(contract),
    isPaused,
    setContract,
  };
}
