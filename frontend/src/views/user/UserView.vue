<template>
  <div class="transition-colors duration-200 bg-white dark:bg-neutral-900">
    <header
      class="pt-32 transition-colors duration-200 bg-candlelight dark:bg-candlelight-600 mondrian-border-b bg-hero-pattern-charlie"
    >
      <div
        class="container flex flex-col items-center justify-start flex-1 w-full h-full mx-auto space-y-12"
      >
        <img
          :alt="user.displayName"
          :src="user.image"
          class="object-cover w-24 h-24 border-4 border-black rounded"
        />

        <div class="flex flex-col items-center space-y-4">
          <div class="text-center text-neutral-900">
            <div class="flex items-center space-x-2">
              <h1 class="text-2xl font-bold slashed-zero">
                {{ getShortAddress(user.address) }}
              </h1>

              <MamoButton
                only-icon
                size="xs"
                flat
                color="blank"
                :tooltip="copied ? 'Copied' : 'Copy'"
                @click.prevent="copy(user.address)"
              >
                <ClipboardCopyIcon class="w-6 h-6"></ClipboardCopyIcon>
              </MamoButton>
            </div>

            <a
              v-if="user.hasEns"
              class="block mx-auto"
              target="_blank"
              :href="`${CONFIG.ensBaseUrl}${user.ensName}`"
              >{{ "@" + user.ensName }}</a
            >
          </div>

          <div
            class="space-x-4 flex items-center justify-start transform -translate-x-0.5 -translate-y-0.5"
          >
            <ShareButtonGroup
              :address="user.address"
              :is-current="user.isCurrent"
              :is-meta-mask="walletProvider?.isMetaMask"
            />
          </div>
        </div>

        <nav
          class="relative flex items-center justify-start w-full px-1 space-x-1 md:justify-center md:space-x-4"
        >
          <router-link
            class="relative inline-flex items-center justify-center flex-1 px-2 text-xs font-bold text-center uppercase transition-colors duration-200 ease-in-out -translate-y-1 bg-white border-4 border-b-0 rounded-t md:flex-grow-0 md:flex-auto md:w-32 md:px-4 border-neutral-800 dark:border-black dark:bg-neutral-800 dark:text-neutral-200 text-neutral-900 h-14 hover:-translate-y-2"
            v-for="(to, title) in tabs"
            :key="title"
            :to="to"
            exact-active-class="z-10 -translate-y-2"
          >
            {{ title }}
          </router-link>
        </nav>
      </div>
    </header>
    <section class="container justify-center px-8 mx-auto sm:px-4">
      <router-view />
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  provide,
  ShallowRef,
  shallowRef,
  watch,
} from "vue";
import { ethers } from "ethers";
import { ClipboardCopyIcon } from "@heroicons/vue/outline";
import { useClipboard } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import { useHead } from "@vueuse/head";
import makeBlockie from "ethereum-blockies-base64";
import CONFIG from "../../../../config";
import { getShortAddress } from "@/utils/ethereum";
import { USER } from "@/utils/types";
import { MamoButton } from "@/components/Button";
import { useENS } from "@/composables/useENS";
import { useAppStore } from "@/store/modules/app";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/modules/user";
import ShareButtonGroup from "@/views/user/components/ShareButtonGroup.vue";

export interface User {
  image: string;
  address: string;
  displayName: string;
  ensName: string | null;
  hasEns: boolean;
  isCurrent: ComputedRef<boolean>;
}

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const {
  isConnectedAndLoggedIn,
  address: currentAddress,
  walletProvider,
} = storeToRefs(useUserStore());

const { setPageLoading } = useAppStore();

// ens handling
const userIdParam = useRouteParams("id");
const ens = useENS();

const user: ShallowRef<User> = shallowRef<User>({
  image: "",
  address: "",
  displayName: "",
  ensName: "",
  hasEns: false,
  isCurrent: computed(
    () =>
      isConnectedAndLoggedIn.value &&
      currentAddress.value === user.value.address
  ),
});

useHead({
  title: user.value.displayName,
});

watch(
  userIdParam,
  async () => {
    setPageLoading(true);
    const isEns = ens.isName(userIdParam.value);

    if (!isEns && !ethers.utils.isAddress(userIdParam.value)) {
      console.log("Invalid id route param");
    }

    const [address, ensName, image] = await Promise.all([
      isEns ? ens.resolveName(userIdParam.value) : userIdParam.value,
      isEns ? userIdParam.value : ens.lookupAddress(userIdParam.value),
      ens.getAvatar(userIdParam.value),
    ]);

    const hasEns = ens.isName(ensName);

    user.value = {
      ...user.value,
      image: image || makeBlockie(address),
      displayName: ensName || address,
      ensName,
      hasEns,
      address,
    };
    setPageLoading(false);
  },
  { immediate: true }
);

provide(USER, user);

const tabs = computed(() => {
  const tabs = {
    Collected: "collected",
    Activity: "activity",
  };

  const auth = {
    "Event Invitation": "event",
    Print: "print",
  };

  return user.value.isCurrent.value ? { ...tabs, ...auth } : tabs;
});
</script>
