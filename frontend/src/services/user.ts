import { usePost } from "@/composables/useRequest";
import { UseFetchOptions } from "@vueuse/core";
import { useMamoSubgraph } from "@/composables/useSubgraph";
import { getActivity, getTokensForAccount } from "@/services/graphql/types";

enum Routes {
  GetLoginChallenge = "/login",
  SendLoginResponse = "/callback",
}

export interface GetLoginChallengeResponse {
  message?: string;
  jwt?: string;
  csrfToken: string;
}

export interface SendLoginResponseResponse {
  jwt: string;
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
   * @description: get collected tokens of an owner
   */
  getCollectedTokens(address: string, options?: UseFetchOptions) {
    return useMamoSubgraph<any>(
      getTokensForAccount,
      {
        owner: address,
      },
      options
    );
  },

  /**
   * @description: get activity of a user
   */
  getActivity(address: string, options?: UseFetchOptions) {
    return useMamoSubgraph<any>(
      getActivity,
      {
        address,
      },
      options
    );
  },
};
