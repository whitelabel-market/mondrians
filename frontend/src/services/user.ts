import { useGet, usePost } from "@/composables/useRequest";

enum Routes {
  GetLoginChallenge = "/login",
  SendLoginResponse = "/callback",
  GetVoucher = "v1/whitelist/voucher",
}

export interface GetLoginChallengeResponse {
  message?: string;
  jwt?: string;
  csrfToken: string;
}

export interface SendLoginResponseResponse {
  jwt: string;
}

export interface GetVoucherResponse {
  signature: string;
}

export default {
  /**
   * @description: user request login challenge
   */
  getLoginChallenge() {
    return usePost<GetLoginChallengeResponse>(Routes.GetLoginChallenge);
  },

  /**
   * @description: user responses to login challenge
   */
  sendLoginResponse(signature: string) {
    return usePost<SendLoginResponseResponse>(Routes.SendLoginResponse, {
      payload: { signature },
    }).execute();
  },

  /**
   * @description: get user voucher
   */
  getVoucher() {
    return useGet<GetVoucherResponse>(Routes.GetVoucher);
  },
};
