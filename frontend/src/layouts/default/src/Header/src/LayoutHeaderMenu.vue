<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div">
      <TransitionChild
        as="template"
        enter="duration-100 ease-out-circ"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="duration-100 ease-out-circ"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <div
          class="fixed top-0 left-0 flex flex-col w-full h-screen bg-white text-neutral-900 dark:bg-neutral-900 transition-colors duration-200 pt-20 lg:hidden z-70"
        >
          <div class="flex-1 p-8 space-y-8 overflow-y-auto mondrian-border-b">
            <ul class="flex flex-col gap-6 font-sans font-bold mobile-controls">
              <li
                v-for="(to, name) in routes"
                :key="to"
                class="text-xl font-bold transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
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
              <MamoButton
                v-if="isConnected"
                :center="false"
                size="sm"
                :loading="loading"
                @click.prevent="$emit('click')"
                color="blank"
                flat
              >
                <div class="z-50 flex items-center w-full gap-4">
                  <img
                    :src="image"
                    :alt="address"
                    class="object-cover w-8 h-8 rounded-full"
                  />
                  <span
                    class="text-sm font-black lowercase transition-colors duration-200 text-neutral-800 dark:text-neutral-200 slashed-zero"
                    >{{ ensAccount?.name || privateAddress }}</span
                  >
                </div>
              </MamoButton>
              <MamoButton
                v-else
                full-width
                color="crimson"
                :loading="loading"
                @click.prevent="emit('connect', true)"
              >
                Connect Wallet
              </MamoButton>

              <div
                class="relative flex items-center justify-between p-4 transition-colors duration-200 bg-neutral-200 dark:text-neutral-400 bg-opacity-60 text-neutral-600 dark:bg-neutral-800 dark:bg-opacity-80 rounded"
              >
                <span
                  class="transition-colors duration-200 text-neutral-900 dark:text-neutral-200"
                  >Appearence</span
                >
                <LayoutHeaderThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog } from "@headlessui/vue";
import { MamoButton } from "@/components/Button";
import LayoutHeaderThemeToggle from "./LayoutHeaderThemeToggle.vue";
import { getRoutes } from "@/utils/constants";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

const emit = defineEmits(["update:modelValue", "connect", "click"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  privateAddress: {
    type: String,
    required: true,
  },
  ensAccount: {
    type: Object,
  },
});

const { address, loading, isConnected } = storeToRefs(useUserStore());

const routes = getRoutes().Home;
</script>
