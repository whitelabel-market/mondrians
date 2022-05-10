<template>
  <div>
    <div class="h-24"></div>
    <header class="fixed top-0 left-0 bg-white w-full mondrian-border-b">
      <nav
        class="container flex items-center justify-between w-full max-w-6xl px-8 h-24 mx-auto"
      >
        <router-link :to="'/'" class="inline-block"> <LogoIcon /> </router-link>
        <AppButton
          class="md:hidden"
          flat
          color="blank"
          size="sm"
          only-icon
          @click="showMobileMenu = true"
        >
          <MenuAlt1Icon class="w-8 h-8" />
        </AppButton>

        <ul
          class="flex items-center text-sm font-semibold mdx:hidden space-x-6"
        >
          <li v-for="(to, name) in routes" :key="to">
            <router-link class="font-black uppercase text-xs" :to="to">{{
              name
            }}</router-link>
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

      <MobileMenu v-model="showMobileMenu" @connect="showConnectModal = true" />

      <WalletConnectModal v-model="showConnectModal" />

      <UserModal
        v-model="showUserModal"
        :privateAddress="privateAddress"
        :blockie="blockie"
        :ensAccount="ensAccount"
      />
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WalletConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import UserModal from "@/components/user/UserModal.vue";
import { useWallet } from "@/composables/useWallet";
import AppButton from "@/components/app/AppButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import MobileMenu from "@/components/layouts/MobileMenu.vue";
import { MenuAlt1Icon } from "@heroicons/vue/solid";

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
