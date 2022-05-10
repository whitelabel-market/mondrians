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
          class="md:hidden fixed left-0 top-0 w-full h-screen bg-white text-black flex flex-col z-80"
        >
          <div
            class="h-24 flex items-center justify-between px-8 mondrian-border-b"
          >
            <LogoIcon />
            <AppButton
              flat
              color="blank"
              size="sm"
              only-icon
              @click="emit('update:modelValue', false)"
            >
              <XIcon class="w-8 h-8"></XIcon>
            </AppButton>
          </div>

          <div class="p-8 flex-1 overflow-y-auto mondrian-border-b">
            <ul class="flex flex-col font-sans font-bold">
              <li
                v-for="(to, name) in routes"
                :key="to"
                class="font-serif font-bold text-2xl"
              >
                <router-link
                  class="block py-4"
                  :to="to"
                  @click="emit('update:modelValue', false)"
                  >{{ name }}</router-link
                >
              </li>
            </ul>
          </div>
          <div class="p-8">
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
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { useWallet } from "@/composables/useWallet";
import AppButton from "@/components/app/AppButton.vue";
import { TransitionRoot, TransitionChild, Dialog } from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";
import LogoIcon from "@/components/icons/LogoIcon.vue";

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
  Faq: "/#Faq",
};
</script>
