<template>
  <div
    class="relative bg-white dark:bg-neutral-900 transition-colors duration-300"
  >
    <div class="h-24"></div>
    <header
      class="fixed top-0 left-0 w-full mondrian-border-b bg-opacity-50 backdrop-blur backdrop-filter"
    >
      <nav
        class="container flex items-center justify-between w-full max-w-6xl px-8 h-24 mx-auto dark:text-neutral-200 transition-colors duration-300"
      >
        <router-link :to="'/'" class="inline-block">
          <LogoIcon
            class="text-neutral-900 dark:text-neutral-200 transition-colors duration-300"
          />
        </router-link>
        <button
          id="mobile-control"
          class="relative w-10 h-7 pointer-events-auto transition-all lg:hidden"
          aria-label="mobile navigation"
          :aria-expanded="showMobileMenu"
          aria-controls="mobile-controls"
          :class="{ 'menu-active': showMobileMenu }"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span></span>
          <span></span>
          <span class="sr-only">Toggle Menu</span>
        </button>
        <ul class="items-center text-sm font-semibold hidden lg:flex space-x-6">
          <li v-for="(to, name) in routes" :key="to">
            <router-link class="font-black uppercase text-xs" :to="to">{{
              name
            }}</router-link>
          </li>
          <li>
            <AppToggleDark />
          </li>
          <li>
            <AppButton
              v-if="!isConnected"
              size="sm"
              color="reddish"
              :loading="loading"
              @click.prevent="showConnectModal = true"
            >
              Connect Wallet
            </AppButton>

            <AppButton
              v-else
              :center="false"
              size="sm"
              :loading="loading"
              @click.prevent="showUserModal = true"
              color="blank"
              flat
            >
              <img
                v-if="blockie"
                :src="blockie"
                class="object-cover w-6 h-6 rounded-full"
              />
              <span class="slashed-zero font-black">{{
                ensAccount?.name || privateAddress
              }}</span>
            </AppButton>
          </li>
        </ul>
      </nav>

      <WalletConnectModal v-model="showConnectModal" />

      <UserModal
        v-model="showUserModal"
        :privateAddress="privateAddress"
        :blockie="blockie"
        :ensAccount="ensAccount"
      />
    </header>
    <MobileMenu v-model="showMobileMenu" @connect="showConnectModal = true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WalletConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import UserModal from "@/components/user/UserModal.vue";
import { useWallet } from "@/composables/useWallet";
import AppButton from "@/components/app/AppButton.vue";
import AppToggleDark from "@/components/app/AppToggleDark.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import MobileMenu from "@/components/layouts/MobileMenu.vue";

const { privateAddress, loading, blockie, isConnected, ensAccount } =
  useWallet();
const showConnectModal = ref(false);
const showUserModal = ref(false);

const showMobileMenu = ref(false);

const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  Faq: "/#Faq",
};
</script>

<style scoped>
#mobile-control span {
  @apply absolute block h-[0.2rem] rounded-full left-2 right-2 bg-neutral-900 dark:bg-neutral-200 duration-500;
}
#mobile-control span:nth-child(1) {
  @apply top-2;
}
#mobile-control span:nth-child(2) {
  @apply bottom-2;
}
#mobile-control.menu-active span {
  @apply transform;
}
#mobile-control.menu-active span:nth-child(1) {
  @apply rotate-45 top-1/2 -translate-y-1/2;
}
#mobile-control.menu-active span:nth-child(2) {
  @apply -rotate-45 bottom-1/2 translate-y-1/2;
}
</style>
