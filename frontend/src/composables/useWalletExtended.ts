import { inject, ref, shallowRef, toRaw } from "vue";
import type { Ref, ShallowRef } from "vue";
import { ethers } from "ethers";
import { weiToEth } from "@/utils/ethereum";
import makeBlockie from "ethereum-blockies-base64";
import {
  useWallet,
  useBlock,
} from "@whitelabel-solutions/wallet-connector-vue";

export const WALLET_CONTEXT = Symbol();

export type EnsAccount = {
  name: string;
  labelName: string;
  labelhash: string;
  createdAt: string;
};

export interface Wallet {
  // state
  blockie: Ref<string>;
  balance: Ref<string>;

  // shortcuts to useful instances
  provider: ShallowRef<ethers.providers.Web3Provider | undefined>;
  signer: Ref<ethers.Signer | undefined>;

  // action methods
  signMessage: (message: string) => Promise<string>;
  getBalance: () => Promise<string>;
}

export function createWalletExtended(): Wallet {
  const {
    address,
    loading,
    provider: walletProvider,
    onAccountsChanged,
    onChainChanged,
    onConnected,
    onDisconnected,
  } = useWallet();

  const { onNewBlock } = useBlock();

  // state
  const balance = ref<string>("0");
  const blockie = ref<string>("");

  // useful instances
  const provider = shallowRef<ethers.providers.Web3Provider | undefined>();
  const signer = shallowRef<ethers.Signer | undefined>();

  // methods
  const connect = async (p: any): Promise<void> => {
    try {
      provider.value = new ethers.providers.Web3Provider(toRaw(p));
    } catch (e: any) {
      loading.value = false;
      throw new Error(e.message);
    }
  };

  const signMessage = async (message: string): Promise<string> => {
    try {
      return signer.value ? await signer.value.signMessage(message) : "";
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getBalance = async (): Promise<string> => {
    try {
      return signer.value
        ? weiToEth((await signer.value.getBalance()).toString()).toString()
        : "";
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const refresh = async () => {
    signer.value = provider.value?.getSigner();
    alert(JSON.stringify(signer.value));
    balance.value = await getBalance();
    blockie.value = makeBlockie(address.value);
  };

  onConnected(async () => {
    if (walletProvider.value) {
      await connect(walletProvider.value);
      await refresh();
    }
  });

  onDisconnected(async () => {
    provider.value = undefined;
    balance.value = "";
    blockie.value = "";
    signer.value = undefined;
  });

  onAccountsChanged(async () => {
    await refresh();
  });

  onChainChanged(async () => {
    alert("chain changed");
    await refresh();
  });

  onNewBlock(async () => {
    balance.value = await getBalance();
  });

  const wallet: Wallet = {
    blockie,
    provider,
    balance,
    signer,
    signMessage,
    getBalance,
  };

  return wallet;
}

export function useWalletExtended(): Wallet {
  const context = inject(WALLET_CONTEXT) as Wallet;

  if (!context) {
    throw new Error("useWalletExtended must be used with createWalletExtended");
  }

  return context;
}
