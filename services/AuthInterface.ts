import api from "@/services/api/auth";

class AuthInterface {
  constructor() {}

  /**
   * execute login challenge to receive a message to sign with users pk
   *
   * @param address eth account address
   * @returns message to sign
   */
  async login(address: string): Promise<string> {
    const message = await api.login(address);
    return message;
  }

  /**
   * callback solution of login challenge to receive jwt access token and refresh token
   *
   * @param address eth account address
   * @param signature signed message from login challenge
   * @param chain name of current active chain
   */
  async callback(
    address: string,
    signature: string,
    chain: string
  ): Promise<void> {
    await api.callback(address, signature, chain);
  }
}

export default AuthInterface;
