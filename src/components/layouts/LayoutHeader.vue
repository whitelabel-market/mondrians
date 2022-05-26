<template>
  <div class="relative">
    <div class="h-24"></div>
    <header
      class="fixed top-0 left-0 w-full bg-opacity-50 mondrian-border-b backdrop-blur backdrop-filter"
    >
      <nav
        class="container flex items-center justify-between w-full h-24 max-w-6xl px-8 mx-auto transition-colors duration-300 dark:text-neutral-200"
      >
        <router-link
          :to="'/'"
          @click.prevent="scrollToTop()"
          class="inline-block"
        >
          <LogoIcon
            class="transition-colors duration-300 text-neutral-900 dark:text-neutral-200"
          />
        </router-link>
        <AppHamburger
          @clicked="showMobileMenu = !showMobileMenu"
          :show="showMobileMenu"
        />
        <ul class="items-center hidden space-x-6 text-sm font-semibold lg:flex">
          <li v-for="(to, name) in routes" :key="to">
            <router-link class="text-xs font-black uppercase" :to="to">{{
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
              <span class="font-black slashed-zero">{{
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
    <MobileMenu
      v-model="showMobileMenu"
      :privateAddress="privateAddress"
      :blockie="blockie"
      :ensAccount="ensAccount"
      @connect="showConnectModal = true"
      @clicked="showUserModal = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WalletConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import UserModal from "@/components/user/UserModal.vue";
import AppHamburger from "@/components/app/AppHamburger.vue";
import { useWallet } from "@/composables/useWallet";
import AppButton from "@/components/app/AppButton.vue";
import AppToggleDark from "@/components/app/AppToggleDark.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import MobileMenu from "@/components/layouts/MobileMenu.vue";
import { gsap } from "gsap";

const showConnectModal = ref(false);
const showUserModal = ref(false);
const showMobileMenu = ref(false);

const { privateAddress, loading, blockie, isConnected, ensAccount } =
  useWallet();

const scrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 0 },
  });
};

const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  Faq: "/#Faq",
};
</script>
