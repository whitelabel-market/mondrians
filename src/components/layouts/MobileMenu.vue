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
          class="lg:hidden fixed left-0 top-0 w-full h-screen flex flex-col z-80 mt-24"
        >
          <div
            class="p-8 flex-1 space-y-8 overflow-y-auto mondrian-border-b bg-white text-neutral-900 dark:bg-neutral-900 transition-colors duration-300"
          >
            <ul class="flex flex-col gap-6 font-sans font-bold mobile-controls">
              <li
                v-for="(to, name) in routes"
                :key="to"
                class="font-bold text-xl text-neutral-900 dark:text-neutral-200 transition-colors duration-300"
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
                class="relative p-4 flex items-center justify-between bg-neutral-200 dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 rounded-xl transition-colors duration-300"
              >
                <span
                  class="text-neutral-900 dark:text-neutral-200 transition-colors duration-300"
                  >Appearence</span
                >
                <AppToggleDarkVue />
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
import AppToggleDarkVue from "@/components/app/AppToggleDark.vue";

const { loading, isConnected } = useWallet();
const emit = defineEmits(["update:modelValue", "connect"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  FAQ: "/#Faq",
};
</script>
