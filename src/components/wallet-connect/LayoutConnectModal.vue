<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div>
      <div v-if="!loading" class="flex flex-col w-full space-y-4">
        <div class="text-lg font-bold text-center leading-5">
          Select a wallet
        </div>
        <ul class="grid grid-cols-1 gap-4 overflow-y-auto border-b pb-4">
          <li
            v-for="(p, i) of providers.slice(
              0,
              providersCollapsed ? providers.length : 4
            )"
            :key="i"
          >
            <AppButton
              full-width
              class="justify-between space-x-6 text-left"
              @click.prevent="connectTo(p)"
            >
              <span class="block">{{ p.name }}</span>
              <img :src="p.logo" class="w-6 h-6" />
            </AppButton>
          </li>
        </ul>
        <div
          class="flex items-center justify-center w-full"
          v-if="providers.length > 3"
        >
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
import AppButton from "@/components/app/AppButton.vue";
import { useWallet } from "@/composables/useWallet";
import { IProvider } from "@whitelabel-solutions/wallet-connector";

const emits = defineEmits(["update:modelValue", "connected"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { providers, connect } = useWallet();
const loading = ref(false);

const providersCollapsed = ref(false);

const connectTo = async (provider: IProvider) => {
  await connect(provider.id);
  emits("update:modelValue", false);
  emits("connected");
};
</script>
