<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div
      class="inline-block max-w-md overflow-hidden text-left align-bottom transform"
    >
      <div v-if="!loading" class="flex flex-col w-full space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-base font-bold leading-5">Select a wallet</div>
        </div>
        <ul class="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
          <li
            v-for="(p, i) of providers.slice(
              0,
              providersCollapsed ? providers.length : 4
            )"
            :key="i"
          >
            <AppButton
              :size="'md'"
              class="flex items-center justify-between px-3 space-x-6 text-left"
              @click.prevent="connectTo(p)"
            >
              <span>{{ p.name }}</span>
              <img :src="p.logo" class="w-6 h-6" />
            </AppButton>
          </li>
        </ul>
        <div class="flex items-center justify-center w-full">
          <button
            class="text-xs font-medium leading-4 text-gray-500 text-secondary hover:text-gray-900 rounded-xl"
            @click.prevent="providersCollapsed = !providersCollapsed"
          >
            {{
              providersCollapsed ? "Show fewer options" : "Show more options"
            }}
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import Connector from "@/libs/@walletConnector";
import AppButton from "@/components/app/AppButton.vue";
import { useWallet } from "@/composables/useWallet";

const emits = defineEmits(["update:modelValue", "connected"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { connect } = useWallet();
const loading = ref(false);

const providers = Connector.init({
  appName: "Mondrians",
  infuraId: "",
  authereum: { key: "" },
  fortmatic: { key: "" },
}).providers;

const providersCollapsed = ref(false);

const connectTo = async (provider: any) => {
  await connect(provider.id);
  emits("update:modelValue", false);
  emits("connected");
};
</script>
