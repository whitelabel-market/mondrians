import { usePost } from "@/composables/useRequest";

enum Routes {
  GetLoginChallenge = "/login",
  SendLoginResponse = "/callback",
}

export interface GetLoginChallengeResponse {
  message: string;
  csrfToken: string;
  jwt: string;
}

export interface SendLoginResponseResponse {
  jwt: string;
}

/**
 * @description: user request login challenge
 */
export function getLoginChallenge() {
  return usePost<GetLoginChallengeResponse>(Routes.GetLoginChallenge);
}

/**
 * @description: user responses to login challenge
 */
export function sendLoginResponse(signature: string) {
  return usePost<SendLoginResponseResponse>(Routes.SendLoginResponse, {
    signature,
  });
}
