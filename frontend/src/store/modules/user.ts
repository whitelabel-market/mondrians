import { defineStore } from "pinia";
import { store } from "@/store";

import { ethers } from "ethers";
import userService, {
  GetLoginChallengeResponse,
  SendLoginResponseResponse,
} from "@/services/user";
import { computed, ref, shallowRef, toRaw, unref } from "vue";
import {
  IProvider,
  useBlock,
  useWallet,
} from "@whitelabel-solutions/wallet-connector-vue";
import makeBlockie from "ethereum-blockies-base64";
import { weiToEth } from "@/utils/ethereum";
import { useENS } from "@/composables/useENS";

export const useUserStore = defineStore("mamo-user", () => {
  const {
    onAccountsChanged,
    onChainChanged,
    onConnected,
    onDisconnected,
    connect,
    provider: walletProvider,
    ...wallet
  } = useWallet();

  const { onNewBlock } = useBlock();

  // state
  const image = ref<string>("");
  const balance = ref<string>("0");
  const xViewerAddress = ref("");
  const xCsrf = ref("1");
  const xCsrfToken = ref("");
  const bearerToken = ref("");

  // useful instances
  const provider = shallowRef<ethers.providers.Web3Provider | undefined>();
  const signer = shallowRef<ethers.Signer | undefined>();
  const network = shallowRef<ethers.providers.Network | undefined>();
  const ensName = ref<null | string>(null);

  const isLoggedIn = computed(() => bearerToken.value !== "");
  const ensExists = computed(() => !ensName.value);
  const displayName = computed(() =>
    ensExists.value ? ensName.value : wallet.address.value
  );

  const isConnectedAndLoggedIn = computed(
    () => wallet.isConnected.value && isLoggedIn.value
  );
  const imageExists = computed(() => image.value !== "");

  const connectWallet = async function (instance: IProvider) {
    await connect(instance);
    await refreshState();
  };

  // methods
  const refreshState = async () => {
    const ens = useENS();

    provider.value = new ethers.providers.Web3Provider(
      toRaw(
        walletProvider.value
      ) as unknown as ethers.providers.ExternalProvider
    );
    // hacky way to get the address even if async call to requestAccounts hast finished
    const walletAddress =
      wallet.address.value === ""
        ? (await provider.value.listAccounts())[0]
        : wallet.address.value;
    xViewerAddress.value = walletAddress;
    signer.value = provider.value.getSigner();
    balance.value = await getBalance(walletAddress);
    network.value = await provider.value.getNetwork();
    ensName.value = await ens.lookupAddress(
      "0x5555763613a12D8F3e73be831DFf8598089d3dCa"
    );

    image.value = ensExists.value
      ? ((await ens.getAvatar(ensName.value as string)) as string)
      : makeBlockie(walletAddress);

    await _login();
  };

  const resetState = function () {
    provider.value = undefined;
    signer.value = undefined;
    balance.value = "0";
    image.value = "";
    ensName.value = "";
    xViewerAddress.value = "";
    xCsrf.value = "1";
    xCsrfToken.value = "";
    bearerToken.value = "";
  };

  const getBalance = async function (
    addressOrName = wallet.address.value
  ): Promise<string> {
    return provider.value
      ? weiToEth(
          (await provider.value.getBalance(addressOrName)).toString()
        ).toString()
      : "0";
  };

  const _login = async function () {
    try {
      const signature = await _getChallengeSignatureAction();
      if (signature) {
        await _sendChallengeSignature(signature);
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
    }
  };

  const _getChallengeSignatureAction = async function () {
    const { data, error } = await userService.getLoginChallenge();
    if (error.value) {
      throw new Error(error.value);
    }
    const { csrfToken, jwt, message } = unref(
      data
    ) as GetLoginChallengeResponse;
    if (jwt) {
      bearerToken.value = jwt;
    }
    xCsrfToken.value = csrfToken;
    if (message) {
      return signer.value?.signMessage(message);
    }
  };

  const _sendChallengeSignature = async function (signature: string) {
    const { data, error } = await userService.sendLoginResponse(signature);
    if (error.value) {
      throw new Error(error.value);
    }
    const { jwt } = unref<SendLoginResponseResponse>(data);
    bearerToken.value = jwt;
  };

  onConnected(refreshState);
  onDisconnected(resetState);
  onAccountsChanged(refreshState);
  onChainChanged(refreshState);

  onNewBlock(async () => {
    balance.value = await getBalance();
  });

  if (walletProvider.value) {
    // init wallet state if provider is already set
    void refreshState();
  }

  return {
    ...wallet,
    image,
    ensName,
    displayName,
    ensExists,
    provider,
    walletProvider,
    signer,
    network,
    balance,
    isLoggedIn,
    isConnectedAndLoggedIn,
    imageExists,
    xViewerAddress,
    xCsrf,
    xCsrfToken,
    bearerToken,
    connectWallet,
  };
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
