<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out-circ"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="duration-300 ease-out-circ"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <div
          class="fixed top-0 left-0 flex flex-col w-full h-screen mt-24 lg:hidden z-80"
        >
          <div
            class="flex-1 p-8 space-y-8 overflow-y-auto transition-colors duration-300 bg-white mondrian-border-b text-neutral-900 dark:bg-neutral-900"
          >
            <ul class="flex flex-col gap-6 font-sans font-bold mobile-controls">
              <li
                v-for="(to, name) in routes"
                :key="to"
                class="text-xl font-bold transition-colors duration-300 text-neutral-900 dark:text-neutral-200"
              >
                <router-link
                  class="block outline-none focus:outline-none"
                  :to="to"
                  @click="emit('update:modelValue', false)"
                  >{{ name }}</router-link
                >
              </li>
            </ul>
            <div class="flex flex-col gap-4">
              <div
                class="relative flex items-center justify-between p-4 transition-colors duration-300 bg-neutral-200 dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 rounded-xl"
              >
                <span
                  class="transition-colors duration-300 text-neutral-900 dark:text-neutral-200"
                  >Appearence</span
                >
                <AppToggleDark />
              </div>
              <AppButton
                v-if="!isConnected"
                full-width
                color="reddish"
                :loading="loading"
                @click.prevent="emit('connect', true)"
              >
                Connect Wallet
              </AppButton>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useWallet } from "@/composables/useWallet";
import AppButton from "@/components/app/AppButton.vue";
import { TransitionRoot, TransitionChild, Dialog } from "@headlessui/vue";
import AppToggleDark from "@/components/app/AppToggleDark.vue";

const emit = defineEmits(["update:modelValue", "connect"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { loading, isConnected } = useWallet();

const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  FAQ: "/#Faq",
};
</script>
