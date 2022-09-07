<template>
  <MamoModal
    :modelValue="modelValue"
    @update:modelValue="
      ($event) => {
        $emit('update:modelValue', $event);
        emailAddress = '';
      }
    "
  >
    <div class="flex flex-col p-4 space-y-4 md:p-8">
      <div class="flex items-center self-center space-x-2">
        <img :src="image" :alt="address" class="object-cover w-8 h-8 rounded" />
        <div>
          <h4 class="block text-xl font-bold slashed-zero leading-0">
            {{ ensAccount?.name ? "@" + ensAccount.name : privateAddress }}
          </h4>
          <a
            v-if="ensAccount?.name"
            :href="`${CONFIG.ensBaseUrl}${address}`"
            class="font-semibold"
            >{{ "@" + ensAccount.name }}</a
          >
        </div>
      </div>

      <div>
        <MamoButton
          full-width
          color="crimson"
          size="sm"
          :to="`/mint`"
          @click.prevent="$emit('update:modelValue', false)"
          ><ViewGridAddIcon class="w-4 h-4" />
          <span class="block">Create my Magic Mondrian</span>
        </MamoButton>
      </div>

      <ul
        class="flex flex-col items-start w-full p-4 space-y-2 bg-white border-2 rounded dark:bg-neutral-900 border-neutral-800 dark:text-neutral-200"
      >
        <li v-for="(link, name) in routes" :key="name" class="block">
          <router-link
            class="flex items-center justify-start space-x-2 link"
            :to="'/user/' + address + '/' + link.to"
            @click.prevent="$emit('update:modelValue', false)"
          >
            <component :is="link.icon" class="w-5 h-5" />
            <span>{{ name }}</span>
          </router-link>
        </li>
      </ul>

      <div
        class="flex flex-col p-4 space-y-2 text-sm bg-white border-2 rounded dark:bg-neutral-900 border-neutral-800 dark:text-neutral-200"
      >
        <div class="flex items-start justify-between w-full">
          <div>
            <div class="flex items-center space-x-2">
              <img
                :src="image"
                :alt="address"
                class="object-cover w-4 h-4 rounded-full"
              />
              <div>
                <h4 class="block font-semibold slashed-zero">
                  {{ privateAddress }}
                </h4>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-start space-x-2">
            <MamoButton
              flat
              rounded="full"
              size="xs"
              color="gray"
              :tooltip="'Viw on Polygonscan'"
              only-icon
              :href="`${CONFIG.explorerBaseUrl}address/${address}`"
            >
              <SearchIcon class="w-4 h-4" />
            </MamoButton>

            <MamoButton
              flat
              rounded="full"
              size="xs"
              color="gray"
              only-icon
              :tooltip="copied ? 'Copied' : 'Copy address'"
              @click.prevent="copy(address)"
            >
              <ClipboardCopyIcon class="w-4 h-4" />
            </MamoButton>
          </div>
        </div>

        <div class="grid grid-cols-[4.5rem_1fr]">
          <div>Network:</div>
          <div>
            <span class="italic font-semibold">Polygon</span>
          </div>
          <div>Balance:</div>
          <div class="-ml-1">
            <div class="flex items-center pb-2 space-x-2">
              <span class="inline-flex items-center space-x-0.5">
                <PolygonIcon class="block w-4 h-4" />
                <span class="block italic font-semibold"
                  >{{ Number(balance).toFixed(2) }}
                </span>
              </span>

              <SwitchHorizontalIcon class="w-3 h-3" />
              <span>
                <span>$&nbsp;</span>
                <span class="italic font-semibold">
                  {{ usdBalance }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <MamoButton
            size="sm"
            full-width
            @click="
              () => {
                $emit('update:modelValue', false);
                signOut();
              }
            "
          >
            Disconnect</MamoButton
          >
        </div>
      </div>
    </div>
  </MamoModal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { MamoModal } from "@/components/Modal";
import { MamoButton } from "@/components/Button";
import { PolygonIcon } from "@/components/Icon";
import {
  CollectionIcon,
  ClipboardCopyIcon,
  SearchIcon,
  SwitchVerticalIcon,
  ViewGridAddIcon,
  PrinterIcon,
  CalendarIcon,
  SwitchHorizontalIcon,
} from "@heroicons/vue/outline";
import { useFetch } from "@vueuse/core";
import { getTokenHourData } from "@/services/graphql/types";
import CONFIG from "../../../../../../../config";
import { useClipboard } from "@vueuse/core";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

defineEmits(["update:modelValue", "click"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  privateAddress: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  ensAccount: {
    type: Object,
    default: () => ({}),
  },
});

const userStore = useUserStore();
const { disconnect } = userStore;
const { address, balance } = storeToRefs(userStore);

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
const maticPrice = ref<string>("");
const emailAddress = ref("");

const routes = {
  "My Collection": {
    icon: CollectionIcon,
    to: `collected`,
  },
  "My Activity": {
    icon: SwitchVerticalIcon,
    to: `activity`,
  },
  "Event Invitation": {
    icon: CalendarIcon,
    to: `event`,
  },
  Print: { icon: PrinterIcon, to: `print` },
};

const usdBalance = computed<string>(() => {
  if (balance && maticPrice.value) {
    return (Number(balance) * Number(maticPrice.value)).toFixed(2);
  }
  return "0.00";
});

const { data, execute, onFetchResponse } = useFetch(
  CONFIG.subgraph.uniswapPolygon,
  {
    timeout: 10000,
  }
)
  .post(
    JSON.stringify({
      query: getTokenHourData,
    })
  )
  .json();

const signOut = (): void => {
  setTimeout(disconnect, 500);
};

onFetchResponse(() => {
  if (data?.value?.data?.tokenHourDatas?.length) {
    maticPrice.value = data.value.data.tokenHourDatas[0].close;
  }
});

// watch(balance, async () => {
//   if (Number(balance.value) > 0) {
//     execute();
//   }
// });
</script>
