import { useGet, usePost } from "@/composables/useRequest";
import { useMamoSubgraph } from "@/composables/useSubgraph";
import { getTokensFromBlock as getTokensFromBlockQuery } from "@/services/graphql/types";
import { until, UseFetchOptions } from "@vueuse/core";
import { ethers } from "ethers";

enum Routes {
  GetVoucher = "v1/whitelist/voucher",
  SendEventInvitation = "v1/whitelist/email",
}

export interface GetVoucherResponse {
  signature: string;
}

export default {
  /**
   * @description: get user voucher
   */
  getVoucher() {
    return useGet<GetVoucherResponse>(Routes.GetVoucher);
  },

  /**
   * @description: gets tokens from transaction receipt
   */
  async getTokensFromTx(address: string, tx: ethers.ContractReceipt) {
    const res = useMamoSubgraph<any>(getTokensFromBlockQuery, {
      address,
      block: tx.blockNumber,
    });
    await until(res.data).toMatch(
      (data) => {
        const tokens = data?.value?.data?.tokens;
        return !!tokens && tokens.length > 0;
      },
      { timeout: 100000, throwOnTimeout: true }
    );
    return res;
  },

  /**
   * @description: send user an invitation to the event
   */
  sendEventInvitation(payload: { email: string }, options?: UseFetchOptions) {
    return usePost<void>(Routes.SendEventInvitation, { payload, ...options });
  },
};
