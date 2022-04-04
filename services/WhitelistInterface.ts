import api from "@/services/api/whitelisting";

class WhitelistInterface {
  constructor() {}

  /**
   * get voucher for authenticated user for whitelist sale
   *
   * @param address eth account address
   * @returns voucher as signature
   */
  async getVoucher(address: string): Promise<string> {
    const signature = await api.getVoucher(address);
    return signature;
  }

  /**
   * add voucher as admin for whitelisted user
   *
   * @param address eth account address
   */
  async addVoucher(address: string): Promise<void> {
    await api.addVoucher(address);
  }
}

export default WhitelistInterface;
