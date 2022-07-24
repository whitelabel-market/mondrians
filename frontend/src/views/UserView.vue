<template>
  <div class="">
    <header
      class="pt-32 bg-candlelight dark:bg-candlelight-600 mondrian-border-b bg-hero-pattern-charlie"
    >
      <div
        class="container flex flex-col items-center justify-start flex-1 w-full h-full mx-auto space-y-12"
      >
        <img
          :alt="route.params.id"
          v-if="route?.params?.id"
          :src="makeBlockie(route.params.id)"
          class="object-cover w-24 h-24 border-4 border-black rounded"
        />

        <div class="flex flex-col items-center space-y-4">
          <div class="text-center text-neutral-900">
            <div
              class="flex items-center space-x-2"
              v-if="ensAccount || /^0x[a-fA-F0-9]{40}$/g.test(route.params.id)"
            >
              <h1 class="text-2xl font-bold slashed-zero">
                {{
                  getShortAddress(
                    ensAccount?.id ||
                      (route.params.id.length
                        ? route.params.id[0]
                        : route.params.id)
                  )
                }}
              </h1>
              <AppButton
                only-icon
                size="xs"
                flat
                color="blank"
                :tooltip="copied ? 'Copied' : 'Copy'"
                @click.prevent="
                  copy(
                    ensAccount?.id ||
                      (route.params.id.length
                        ? route.params.id[0]
                        : route.params.id)
                  )
                "
              >
                <ClipboardCopyIcon class="w-6 h-6"></ClipboardCopyIcon>
              </AppButton>
            </div>

            <a
              v-if="ensAccount?.domains?.[0]"
              class="block mx-auto"
              target="_blank"
              :href="`${CONFIG.ensBaseUrl}${ensAccount.id}`"
              >{{ "@" + ensAccount.domains[0].name }}</a
            >
          </div>

          <div
            class="space-x-4 flex items-center justify-start transform -translate-x-0.5 -translate-y-0.5"
            v-if="route?.params?.id"
          >
            <ShareButtons
              :address="route.params.id"
              :hintVisible="hintVisible"
            />
          </div>
        </div>

        <nav
          class="relative flex items-center justify-start w-full px-1 space-x-1 md:justify-center md:space-x-4"
        >
          <router-link
            class="relative inline-flex items-center justify-center flex-1 px-2 text-xs font-bold text-center uppercase transition-colors duration-100 ease-in-out -translate-y-1 bg-white border-4 border-b-0 rounded-t md:flex-grow-0 md:flex-auto md:w-32 md:px-4 border-neutral-800 dark:border-black dark:bg-neutral-800 dark:text-neutral-200 text-neutral-900 h-14 hover:-translate-y-2"
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
      <router-view @showHint="hintVisible = true"></router-view>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ShareButtons from "@/components/share/ShareButtons.vue";
import AppButton from "@/components/app/AppButton.vue";
import { ClipboardCopyIcon } from "@heroicons/vue/outline";
import { useClipboard, useFetch } from "@vueuse/core";
import CONFIG from "@/../../config";
import { getShortAddress } from "@/utils/ethereum";
import { ENS_ACCOUNT, EnsAccount } from "@/utils/types";
import { getEnsAccount, getEnsAccountReverse } from "@/services/graphql/types";
import makeBlockie from "ethereum-blockies-base64";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";

const { copy, copied } = useClipboard({ copiedDuring: 2000 });

const emits = defineEmits(["loaded"]);
emits("loaded", true); // avoids loading animation

const hintVisible = ref(false);
const { isConnected } = useWallet();

// ens handling
const route = useRoute();
const ensAccount = ref<EnsAccount>();
provide(ENS_ACCOUNT, ensAccount);

const { post, onFetchResponse, data } = useFetch(CONFIG.subgraph.ens, {
  timeout: 10000,
  immediate: false,
}).json();

onFetchResponse(() => {
  if (data?.value?.data?.account?.domains.length > 0) {
    ensAccount.value = data.value.data.account;
  } else if (data?.value?.data?.domains?.[0]?.owner?.domains.length > 0) {
    ensAccount.value = data.value.data.domains[0].owner;
  } else {
    ensAccount.value = {
      id: (route.params.id as string).toLowerCase(),
      domains: [],
    };
  }
});

const isValidEthAddress = computed(() =>
  /^0x[a-fA-F0-9]{40}$/g.test(route.params.id as string)
);

const isEnsName = computed(() => (route.params.id as string).endsWith(".eth"));

watch(
  route,
  () => {
    hintVisible.value = false;
    if (route?.params?.id)
      post(
        JSON.stringify({
          query: isValidEthAddress.value ? getEnsAccount : getEnsAccountReverse,
          variables: {
            address: isValidEthAddress.value
              ? (route.params.id as string).toLowerCase()
              : isEnsName.value
              ? (route.params.id as string).toLowerCase()
              : (route.params.id as string) + ".eth",
          },
        })
      ).execute();
  },
  { deep: true, immediate: true }
);

const tabs = computed(() => {
  const tabs = {
    Collected: "collected",
    Activity: "activity",
  };

  const auth = {
    "Event Invitation": "event",
    Print: "print",
  };
  return isConnected.value ? { ...tabs, ...auth } : tabs;
});
</script>
