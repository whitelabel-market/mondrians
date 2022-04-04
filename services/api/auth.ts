import request, { setXCsrfToken, setAccessToken } from "./fetch";
import { BACKEND_URL } from "@/utils/constants";

const login = async (address: string): Promise<string> => {
  const response = await request(
    `${BACKEND_URL}/login`,
    undefined,
    "POST",
    "application/json",
    {
      address,
    }
  );

  const { csrfToken, message } = response;

  if (csrfToken) setXCsrfToken(csrfToken);

  if (message) return message;

  throw new Error("No message to sign");
};

const callback = async (
  address: string,
  signature: string,
  chain: string
): Promise<void> => {
  const response = await request(
    `${BACKEND_URL}/callback`,
    undefined,
    "POST",
    "application/json",
    { address, signature, chain }
  );

  const { jwt } = response;

  if (jwt) {
    setAccessToken(jwt);
    return;
  }

  throw new Error("No jwt returned");
};

export default {
  login,
  callback,
};
