<template>
  <NotificationGroup group="app">
    <div
      class="fixed bottom-0 left-0 w-full p-4 pointer-events-none z-100 lg:px-8 lg:py-12"
    >
      <Notification
        v-slot="{ notifications, close }"
        enter="transform ease-out duration-300"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="ease-in duration-1000"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="duration-500"
        move-delay="delay-300"
      >
        <div v-for="notification in notifications" :key="notification.id">
          <div
            class="relative flex items-center w-full sm:max-w-md max-w-sm p-4 mt-4 ml-auto space-x-4 bg-[#FCEFEB] dark:bg-neutral-800 border-2 border-[#EBD0CA] dark:border-neutral-700 rounded pointer-events-auto after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-50 after:bg-neutral-800 dark:after:bg-black after:rounded after:transform after:translate-x-1.5 after:translate-y-1.5 delay-0"
          >
            <div
              class="flex items-center justify-center p-1 bg-white dark:bg-neutral-800 rounded-full border-8 border-[#F8585C] dark:border-red-500"
            >
              <XIcon
                class="w-4 h-4 text-[#F8585C] dark:text-red-500 stroke-4"
              />
            </div>

            <div class="flex-1">
              <span class="font-semibold dark:text-red-500">{{
                notification.title
              }}</span>
              <p class="text-sm dark:text-neutral-200">
                {{ notification.text }}
                <a
                  :href="`mailto:${CONFIG.supportEmail}?subject=Error report from ${address}&body=Hello,%0D%0A%0D%0APlease insert your custom message for the Mondrian support here!.%0D%0A%0D%0A%0D%0A%0D%0APlease find attached the official error report:%0D%0A%0D%0A${notification.data}`"
                  class="underline"
                  >Send report</a
                >
              </p>
            </div>

            <button class="self-center" @click="close(notification.id)">
              <XIcon class="w-5 h-5 text-neutral-700 dark:text-neutral-500" />
            </button>
          </div>
        </div>
      </Notification>
    </div>
  </NotificationGroup>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/solid";
import CONFIG from "@/../../config";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
const { address } = useWallet();
</script>
