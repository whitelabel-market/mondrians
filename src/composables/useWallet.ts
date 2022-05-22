import { inject, computed, ref, watch, shallowRef, toRaw } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { ConfigurableWindow } from "@vueuse/core";
import {
  defaultWindow,
  useStorage,
  RemovableRef,
  useFetch,
} from "@vueuse/core";
import {
  Connector,
  Providers,
  IProvider,
} from "@whitelabel-solutions/wallet-connector";
import { ethers } from "ethers";
import { getShortAddress, weiToEth } from "@/utils/ethereum";
import makeBlockie from "ethereum-blockies-base64";
import { ENS_SUBGRAPH, INFURA_ID } from "@/utils/constants";
import { getEnsAccount } from "@/services/graphql/types";

const { MetaMaskProvider, WalletLinkProvider, WalletConnectProvider } =
  Providers;
export const WALLET_CONTEXT = Symbol();

export type EnsAccount = {
  name: string;
  labelName: string;
  labelhash: string;
  createdAt: string;
};

const { post, onFetchResponse, data } = useFetch(ENS_SUBGRAPH, {
  timeout: 10000,
  immediate: false,
}).json();
export interface Wallet {
  // state
  address: Ref<string>;
  ensAccount: Ref<EnsAccount | undefined>;
  blockie: Ref<string>;
  loading: Ref<boolean>;
  network: Ref<ethers.providers.Network | undefined>;
  isConnected: Ref<boolean>;
  privateAddress: Ref<string>;
  providers: IProvider[];

  // shortcuts to useful instances
  provider: ShallowRef<ethers.providers.Web3Provider | undefined>;
  signer: Ref<ethers.Signer | undefined>;

  // action methods
  connect: (provider: any) => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
  getBalance: () => Promise<string>;
}

const connector = Connector.init(
  {
    appName: "Magic Mondrian",
    infuraId: INFURA_ID,
    chainId: 80001,
    authereum: { key: "" }, // Yet required (but unused) in ConnectorUserOptions type
    fortmatic: { key: "" }, // Yet required (but unused) in ConnectorUserOptions type
  },
  [MetaMaskProvider, WalletLinkProvider, WalletConnectProvider]
);

export function createWallet(options: ConfigurableWindow = {}): Wallet {
  let walletProvider: RemovableRef<string | null>;

  // state
  const address = ref<string>("");
  const ensAccount = ref<EnsAccount | undefined>();
  const blockie = ref<string>("");
  const loading = ref<boolean>(false);
  const network = ref<ethers.providers.Network | undefined>();
  const isConnected = computed<boolean>(() => !!provider.value);
  const privateAddress = computed<string>(() => getShortAddress(address.value));
  const { providers } = connector;

  // useful instances
  const provider = shallowRef<ethers.providers.Web3Provider | undefined>();
  const signer = computed<ethers.Signer | undefined>(() =>
    provider.value ? provider.value.getSigner() : undefined
  );

  // methods
  const connect = async (providerID: string): Promise<void> => {
    console.log(providerID);
    loading.value = true;
    provider.value = undefined;
    const iProvider: any = providers.find(
      (provider) => provider.id === providerID
    );
    console.log(iProvider);
    try {
      console.log(toRaw(await iProvider.connect()));
      provider.value = iProvider
        ? new ethers.providers.Web3Provider(toRaw(await iProvider.connect()))
        : undefined;
      console.log(provider.value);
      if (provider.value)
        walletProvider = useStorage("wallet-provider", providerID);
    } catch (e: any) {
      console.log(e);
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
        ? weiToEth(
            await (await signer.value.getBalance()).toString()
          ).toString()
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

  // automatically detect wallet (only working for injected)
  if (window) {
    if ((window as any).ethereum) {
      const ethereumProvider = new ethers.providers.Web3Provider(
        // @ts-ignore
        window.ethereum,
        "any"
      );

      (window as any).ethereum.on("accountsChanged", async () => {
        address.value = await getAddress();
        blockie.value = makeBlockie(address.value);
      });

      ethereumProvider.on(
        "network",
        async (newNetwork: ethers.providers.Network) => {
          if (provider.value) network.value = newNetwork;
        }
      );
    }

    if (window.localStorage.getItem("ens-account")) {
      const storedEnsAccount = JSON.parse(
        window.localStorage.getItem("ens-account") as string
      );
      if (data?.value?.data?.account?.domains.length > 0)
        ensAccount.value = storedEnsAccount?.domains[0];
    }

    if (window.localStorage.getItem("wallet-provider")) {
      const index = providers.findIndex(
        (provider) =>
          provider.id === window.localStorage.getItem("wallet-provider")
      );
      if (index > -1) connect(providers[index].id);
    }
  }

  onFetchResponse(() => {
    if (data?.value?.data?.account?.domains.length > 0) {
      ensAccount.value = data.value.data.account.domains[0];
      useStorage("ens-account", data.value.data.account);
    }
  });

  // reload address and network on connect
  watch(provider, async () => {
    [address.value, network.value] = await Promise.all([
      getAddress(),
      getNetwork(),
    ]);
    if (address.value) {
      blockie.value = makeBlockie(address.value);
      if (!ensAccount.value)
        post(
          JSON.stringify({
            query: getEnsAccount,
            variables: {
              address: address.value.toLowerCase(),
            },
          })
        ).execute();
    }
    loading.value = false;
  });

  const wallet: Wallet = {
    address,
    ensAccount,
    blockie,
    loading,
    privateAddress,
    providers,
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
