import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { ethers } from "ethers";
import CONFIG from "../../../config.js";
import {
  getContract as getContractQuery,
  getTokensFromBlock as getTokensFromBlockQuery,
} from "@/services/graphql/types";

const timeout = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default function useSubgraph() {
  const getTokenByAddress = async function (
    address: string,
    tx: ethers.ContractTransaction
  ): Promise<any> {
    const block = tx.blockNumber;
    const tokens = ref([]);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data } = await useFetch(CONFIG.subgraph.mamo, { timeout: 10000 })
        .post(
          JSON.stringify({
            query: getTokensFromBlockQuery,
            variables: {
              address: address.toLowerCase(),
              block,
            },
          })
        )
        .json();
      if (data?.value?.data?.tokens?.length > 0) {
        tokens.value = data.value.data.tokens;
        break;
      } else {
        await timeout(5000); // wait 5s
      }
    }
    return tokens.value;
  };

  const getContract = async function () {
    return useFetch(CONFIG.subgraph.mamo, {
      timeout: 10000,
    })
      .post(
        JSON.stringify({
          query: getContractQuery,
          variables: {
            id: CONFIG.contract.toLocaleLowerCase(),
          },
        })
      )
      .json();
  };

  return { getTokenByAddress, getContract };
}
