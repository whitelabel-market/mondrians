import request from "./fetch";
import { BACKEND_URL } from "@/utils/constants";

const getVoucher = async (address: string): Promise<string> => {
  const response = await request(
    `${BACKEND_URL}/api/voucher`,
    `address=${address}`,
    undefined,
    "application/json"
  );

  const { signature } = response;

  if (signature) return signature;
  throw new Error("No signature received");
};

const addVoucher = async (address: string): Promise<void> => {
  const response = await request(
    `${BACKEND_URL}/api/voucher`,
    `address=${address}`,
    "POST",
    "application/json"
  );
};

export default { getVoucher, addVoucher };
