import { computed, isRef, readonly, ref } from "vue";
import { useFlag } from "@/composables/useFlags";
import { MaybeRef } from "@vueuse/core";
import type { Contract } from "@/utils/types";

export enum Phase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
  Reveal = "reveal",
}

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
  const presaleEnabled = useFlag(Phase.PreSale);
  const whitelistEnabled = useFlag(Phase.WhitelistSale);
  const publicsaleEnabled = useFlag(Phase.PublicSale);
  const revealEnabled = useFlag(Phase.Reveal);

  const isPaused = computed<boolean>(() => !!contract.value.paused);

  const getPrice = computed<string>(() =>
    whitelistEnabled.value ? "0.00025" : "0.005"
  );
  const getMaxMint = computed<number>(() => (whitelistEnabled.value ? 5 : 10));

  const setContract = (v: MaybeRef<Contract>) => {
    contract.value = isRef(v) ? v.value : v;
  };

  return {
    contract: readonly(contract),
    presaleEnabled,
    whitelistEnabled,
    publicsaleEnabled,
    revealEnabled,
    isPaused,
    getPrice,
    getMaxMint,
    setContract,
  };
}
