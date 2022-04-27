<template>
  <div
    class="container flex flex-col items-center justify-start flex-1 w-full h-full max-w-6xl pt-10 mx-auto gap-y-6"
  >
    <img
      :src="makeBlockie(route.params.id)"
      class="object-cover w-24 h-24 border-4 border-gray-200 rounded-full"
    />
    <a
      v-if="ensAccount?.name"
      class="-mt-4 -mb-4 hover:text-blueish"
      target="_blank"
      :href="`${ENS_BASE_URL}${route.params.id}`"
      >{{ "@" + ensAccount.name }}</a
    >
    <AppTooltip :show="copied">
      <template #element
        ><button
          class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
          @click.prevent="copy(route.params.id)"
        >
          <EthereumIcon class="w-2" />
          <span class="text-xs font-medium slashed-zero">{{
            getPrivateAddress
          }}</span>
        </button></template
      >
      <template #text>Copied!</template>
    </AppTooltip>
    <div class="flex items-center gap-2">
      <span class="relative inline-flex">
        <button
          class="flex items-center justify-center p-2 text-gray-700 border border-gray-200 rounded-full"
          @click.prevent="addToken()"
        >
          <UploadIcon class="w-5 h-5" />
        </button>
        <span
          v-if="signVisible"
          class="absolute top-0 right-0 flex w-2 h-2 mt-0.5 mr-0.5"
        >
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          ></span>
          <span
            class="relative inline-flex w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </span>
      </span>

      <button
        class="flex items-center justify-center p-2 text-gray-700 border border-gray-200 rounded-full"
      >
        <DotsHorizontalIcon class="w-5 h-5" />
      </button>
    </div>
    <nav
      class="flex justify-center w-full mx-auto space-x-10 border-b-2 border-gray-100"
    >
      <router-link
        v-for="title in tabs"
        :key="title"
        :to="title.toLowerCase()"
        v-slot="{ isExactActive }"
      >
        <div
          :class="[
            'relative flex items-center',
            title === 'certified' &&
              (user.role !== 'certifier' ||
                user.address !== route.params.address) &&
              'cursor-not-allowed',
          ]"
        >
          <div
            class="pb-2 font-semibold capitalize transition duration-150 ease-in-out hover:text-blueish"
            :class="isExactActive ? 'text-blueish' : 'text-gray-300'"
          >
            {{ title }}
          </div>
          <span
            aria-hidden="true"
            class="absolute w-full h-0.5 -bottom-0.5 left-0 transition duration-150 ease-in-out"
            :class="isExactActive ? 'bg-blueish' : 'bg-transparent'"
          ></span>
        </div>
      </router-link>
    </nav>
    <div class="w-full">
      <router-view @makeSign="signVisible = true"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useClipboard, useFetch } from "@vueuse/core";
import { ENS_SUBGRAPH, ENS_BASE_URL } from "@/utils/constants";
import { getEnsAccount } from "@/services/graphql/types";
import makeBlockie from "ethereum-blockies-base64";
import EthereumIcon from "@/components/icons/EthereumIcon.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import { DotsHorizontalIcon } from "@heroicons/vue/solid";
import { UploadIcon } from "@heroicons/vue/outline";

const emits = defineEmits(["loaded"]);
emits("loaded");

const ensAccount = ref();
const signVisible = ref(false);
const route = useRoute();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const { post, onFetchResponse, data } = useFetch(ENS_SUBGRAPH, {
  timeout: 10000,
  immediate: false,
}).json();

const getPrivateAddress = computed(() => {
  const address = route.params.id;
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 5,
    address.length
  )}`;
});

onFetchResponse(() => {
  if (data?.value?.data?.account?.domains.length > 0) {
    ensAccount.value = data.value.data.account.domains[0];
  }
});

const addToken = async () => {
  const tokenAddress = "0xbd775bc3577596d416bf15e9827e9039cd7b02d6";
  const tokenSymbol = "MAMO";
  const tokenDecimals = 0;
  const tokenImage =
    "https://ipfs.io/ipfs/bafybeibiq6ecljwluh3t4cfvhb3ljj6ziygj5twyabrusl2f2z5qewctom/1.svg";

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};

watch(
  route,
  () => {
    signVisible.value = false;
    if (route?.params?.id)
      post(
        JSON.stringify({
          query: getEnsAccount,
          variables: {
            address: route.params.id.toLowerCase(),
          },
        })
      ).execute();
  },
  { deep: true, immediate: true }
);

const tabs = ["Collected", "Activity"];
</script>
