import { useGet, usePost } from "@/composables/useRequest";

enum Routes {
  Send = "v1/print/order",
  GetByUser = "v1/print/tokens",
}

export interface GetPrintedTokensByUserResponse {
  tokens: any[];
}

export default {
  /**
   * @description: send print request
   */
  send(payload: any) {
    return usePost<void>(Routes.Send, { payload });
  },

  /**
   * @description: get printed tokens of a user
   */
  getByUser() {
    return useGet<GetPrintedTokensByUserResponse>(Routes.GetByUser);
  },
};
