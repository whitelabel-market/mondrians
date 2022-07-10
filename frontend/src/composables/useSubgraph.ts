import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, MAMO_SUBGRAPH } from "@/utils/constants";
import {
  getContract as getContractQuery,
  getTokensFromBlock as getTokensFromBlockQuery,
} from "@/services/graphql/types";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";

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
      const { data } = await useFetch(MAMO_SUBGRAPH, { timeout: 10000 })
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
    return useFetch(MAMO_SUBGRAPH, {
      timeout: 10000,
    })
      .post(
        JSON.stringify({
          query: getContractQuery,
          variables: {
            id: CONTRACT_ADDRESS.toLocaleLowerCase(),
          },
        })
      )
      .json();
  };

  return { getTokenByAddress, getContract };
}
