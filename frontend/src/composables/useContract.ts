import { computed, inject, Ref, ref, shallowRef, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStoreWithOut } from "@/store/modules/user";
import { ethers } from "ethers";
import CONFIG from "../../../config";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

interface txOptions {
  txWait: boolean;
}

interface MintParams {
  quantity: number;
  price: string;
  signature?: string;
}

type MintOptions = txOptions;

interface PrintParams {
  token: any;
  address: string;
}

export const CONTRACT_CONTEXT = Symbol();

export function createContract(contractRes: Ref<any>): any {
  const { provider, signer, address } = storeToRefs(useUserStoreWithOut());

  const id = ref("");
  const maxSupply = ref(0);
  const totalSupply = ref(0);
  const maxReserved = ref(0);
  const supportsMetadata = ref(false);
  const name = ref("");
  const paused = ref(false);
  const symbol = ref("");

  const contract = shallowRef();

  const isPaused = computed<boolean>(() => !!paused.value);
  const isSoldOut = computed<boolean>(
    () => maxSupply.value === totalSupply.value
  );

  watch(contractRes, () => {
    if (contractRes.value.data?.contract) {
      const { contract: res } = contractRes.value.data;
      id.value = res.id;
      maxSupply.value = res.maxSupply;
      totalSupply.value = res.totalSupply;
      maxReserved.value = res.maxReserved;
      supportsMetadata.value = res.supportsMetadata;
      name.value = res.name;
      paused.value = res.paused;
      symbol.value = res.symbol;
    }
  });

  watch(provider, () => {
    contract.value = new ethers.Contract(
      CONFIG.contract,
      magicMondrian.abi,
      provider.value
    );
  });

  /**
   * Mint new tokens
   * @param params params
   * @param options options
   */
  const mint = async function (params: MintParams, options?: MintOptions) {
    try {
      const isWhitelistMint = !!params.signature;
      const tx = isWhitelistMint
        ? await whitelistMint(params)
        : await publicMint(params);

      if (options?.txWait) {
        await tx.wait();
      }

      return tx;
    } catch (e: any) {
      const error: any = {};
      Object.keys(e).forEach((key) => {
        error[key] = e[key];
      });
      throw error;
    }
  };

  // Internal components function for Whitelist Sale
  const whitelistMint = async function ({
    quantity,
    price,
    signature,
  }: MintParams) {
    const signedContract = contract.value.connect(signer.value);

    return signedContract.whitelistMint(address.value, quantity, signature, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });
  };

  // Internal components function for Public Sale
  const publicMint = async function ({ quantity, price }: MintParams) {
    const signedContract = contract.value.connect(signer.value);

    return signedContract.publicSaleMint(address.value, quantity, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });
  };

  // Function to send ether/matic to contract for printing
  const print = async function (
    { token, address }: PrintParams,
    options?: MintOptions
  ) {
    try {
      const price = ethers.utils.formatEther(await contract.value.printPrice());
      if (await contract.value.hasPrintedOnce(address, token.id)) {
        // return if already printed and let backend decide
        return;
      }

      const signedContract = contract.value.connect(signer.value);

      const tx = await signedContract.print(token.id, {
        value: ethers.utils.parseEther(price),
      });

      if (options?.txWait) {
        await tx.wait();
      }

      return tx;
    } catch (e: any) {
      const error: any = {};
      Object.keys(e).forEach((key) => {
        error[key] = e[key];
      });
      throw error;
    }
  };

  return {
    id,
    maxSupply,
    totalSupply,
    maxReserved,
    supportsMetadata,
    name,
    paused,
    isPaused,
    isSoldOut,
    symbol,
    mint,
    whitelistMint,
    publicMint,
    print,
  };
}

export function useContract(): any {
  const context = inject(CONTRACT_CONTEXT) as any;

  if (!context) {
    throw new Error("useContract must be used with createContract");
  }

  return context;
}
