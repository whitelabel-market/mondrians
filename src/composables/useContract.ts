import { computed, isRef, ref } from "vue";
import { ethers } from "ethers";
import { MaybeRef } from "@vueuse/core";

export type Contract = {
  cost: number;
  id: string;
  supportsMetadata: boolean;
  maxMint: number;
  maxSupply: number;
  maxReserved: number;
  totalSupply: number;
  name: string;
  paused: boolean;
  phase: number;
  symbol: string;
};

export enum Phase {
  PreSale = 0,
  WhitelistSale = 1,
  PublicSale = 2,
  Reveal = 3,
}

const contract = ref<Contract>({
  cost: 0,
  id: "",
  maxMint: 0,
  maxSupply: 0,
  totalSupply: 0,
  maxReserved: 0,
  supportsMetadata: false,
  name: "",
  paused: false,
  phase: 0,
  symbol: "",
});

export default function useContract() {
  const fullContract = computed<Contract>({
    get() {
      return contract.value;
    },
    set(v: MaybeRef<Contract>) {
      contract.value = isRef(v) ? v.value : v;
    },
  });

  const isPaused = computed<boolean>(() => !!fullContract.value.paused);
  const getPrice = computed<string>(() => {
    return ethers.utils.formatEther(contract.value.cost);
  });
  const getPhase = computed<string>(() => Phase[contract.value.phase]);

  return {
    contract: fullContract,
    isPaused,
    getPrice,
    getPhase,
  };
}
