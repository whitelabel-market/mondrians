import { inject, computed, ref, watch, shallowRef } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { ConfigurableWindow } from "@vueuse/core";
import { defaultWindow, useStorage, RemovableRef } from "@vueuse/core";
import Connector from "@/libs/@walletConnector";
import { ethers } from "ethers";
import makeBlockie from "ethereum-blockies-base64";

export const WALLET_CONTEXT = Symbol();

export interface Wallet {
  // state
  address: Ref<string>;
  blockie: Ref<string>;
  loading: Ref<boolean>;
  network: Ref<ethers.providers.Network | undefined>;
  isConnected: Ref<boolean>;
  privateAddress: Ref<string>;

  // shortcuts to useful instances
  provider: ShallowRef<ethers.providers.Web3Provider | undefined>;
  signer: Ref<ethers.Signer | undefined>;

  // action methods
  connect: (provider: any) => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
  getBalance: () => Promise<string>;
}

const providers = Connector.init({
  appName: "Magic Mondrian",
  infuraId: "",
  authereum: { key: "" },
  fortmatic: { key: "" },
}).providers;

export function createWallet(options: ConfigurableWindow = {}): Wallet {
  let walletProvider: RemovableRef<string | null>;

  // state
  const address = ref<string>("");
  const blockie = ref<string>("");
  const loading = ref<boolean>(false);
  const network = ref<ethers.providers.Network | undefined>();
  const isConnected = computed<boolean>(() => !!provider.value);
  const privateAddress = computed<string>(() =>
    address.value
      ? `${address.value.substring(0, 5)}...${address.value.substring(
          address.value.length - 5,
          address.value.length
        )}`
      : ""
  );

  // useful instances
  const provider = shallowRef<ethers.providers.Web3Provider | undefined>();
  const signer = computed<ethers.Signer | undefined>(() =>
    provider.value ? provider.value.getSigner() : undefined
  );

  // methods
  const connect = async (providerID: string): Promise<void> => {
    loading.value = true;
    provider.value = undefined;
    const iProvider: any = providers.find(
      (provider) => provider.id === providerID
    );
    try {
      provider.value = iProvider
        ? new ethers.providers.Web3Provider(await iProvider.connect())
        : undefined;
      if (provider.value)
        walletProvider = useStorage("wallet-provider", providerID);
    } catch (e: any) {
      loading.value = false;
      throw new Error(e.message);
    }
  };

  const disconnect = (): void => {
    provider.value = undefined;
    network.value = undefined;
    address.value = "";
    walletProvider.value = null;
  };

  const signMessage = async (message: string): Promise<string> => {
    try {
      return signer.value ? await signer.value.signMessage(message) : "";
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getAddress = async (): Promise<string> => {
    try {
      return signer.value ? await signer.value.getAddress() : "";
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const getBalance = async (): Promise<string> => {
    try {
      return signer.value
        ? ethers.utils.formatEther(await signer.value.getBalance())
        : "";
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const getNetwork = async (): Promise<
    ethers.providers.Network | undefined
  > => {
    try {
      return provider.value ? await provider.value.getNetwork() : undefined;
    } catch (e: any) {
      throw new Error(e.toString());
    }
  };

  const { window = defaultWindow } = options;

  // automatically detect wallet
  if (window) {
    if (window.ethereum) {
      const ethereumProvider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      window.ethereum.on("accountsChanged", async () => {
        address.value = await getAddress();
        blockie.value = makeBlockie(address.value);
      });

      ethereumProvider.on(
        "network",
        async (
          newNetwork: ethers.providers.Network,
          oldNetwork: ethers.providers.Network
        ) => {
          if (provider.value) network.value = newNetwork;
        }
      );
    }

    if (window.localStorage.getItem("wallet-provider")) {
      const index = providers.findIndex(
        (provider) =>
          provider.id === window.localStorage.getItem("wallet-provider")
      );

      if (index > -1) connect(providers[index].id);
    }
  }

  // reload address and network on connect
  watch(provider, async () => {
    [address.value, network.value] = await Promise.all([
      getAddress(),
      getNetwork(),
    ]);
    if (address.value) {
      blockie.value = makeBlockie(address.value);
      loading.value = false;
    }
  });

  const wallet: Wallet = {
    address,
    blockie,
    loading,
    privateAddress,
    network,
    isConnected,
    provider,
    signer,
    connect,
    disconnect,
    signMessage,
    getBalance,
  };

  return wallet;
}

export function useWallet(): Wallet {
  const context = inject(WALLET_CONTEXT) as Wallet;

  if (!context) {
    throw new Error("useWallet must be used with useWalletProvider");
  }

  return context;
}
