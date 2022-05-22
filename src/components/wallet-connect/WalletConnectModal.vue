<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div>
      <div v-if="!loading" class="flex flex-col w-full space-y-8">
        <h3 class="text-2xl font-bold text-center">Select a wallet</h3>
        <ul class="space-y-4">
          <li
            v-for="(p, i) of providers.slice(
              0,
              providersCollapsed ? providers.length : 4
            )"
            :key="i"
          >
            <AppButton
              :fullWidth="true"
              @click.prevent="connectTo(p)"
              :center="false"
            >
              <span class="block font-semibold text-left">{{ p.name }}</span>
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
