<template>
  <div>
    <header
      class="fixed top-0 left-0 w-full transition-colors duration-200 bg-white mondrian-border-b z-80 dark:bg-neutral-900"
    >
      <nav
        class="container flex items-center justify-between w-full h-20 max-w-6xl px-8 mx-auto"
      >
        <router-link :to="'/'" class="inline-block">
          <LogoIcon
            class="transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
          />
        </router-link>
        <AppHamburger
          @click="showMobileMenu = !showMobileMenu"
          :show="showMobileMenu"
        />
        <ul class="items-center hidden space-x-6 text-sm font-semibold lg:flex">
          <li v-for="(to, name) in routes" :key="to">
            <router-link
              class="transition-colors duration-200 link text-neutral-800 dark:text-neutral-200"
              :to="to"
              >{{ name }}</router-link
            >
          </li>
          <li>
            <AppToggleDark />
          </li>
          <li>
            <AppButton
              v-if="!isConnected"
              size="sm"
              color="crimson"
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
              <span
                class="font-black duration-200 slashed-zero transitioncolors text-neutral-800 dark:text-neutral-200"
                >{{ ensAccount?.name || shortAddress }}</span
              >
            </AppButton>
          </li>
        </ul>
      </nav>

      <WalletConnectModal v-model="showConnectModal" />
      <UserModal
        v-model="showUserModal"
        :privateAddress="shortAddress"
        :blockie="blockie"
        :ensAccount="ensAccount"
      />
    </header>
    <MobileMenu
      v-model="showMobileMenu"
      :privateAddress="shortAddress"
      :blockie="blockie"
      :ensAccount="ensAccount"
      @connect="showConnectModal = true"
      @click="showUserModal = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import WalletConnectModal from "@/components/wallet/WalletConnectModal.vue";
import UserModal from "@/components/user/UserModal.vue";
import AppHamburger from "@/components/app/AppHamburger.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import AppButton from "@/components/app/AppButton.vue";
import AppToggleDark from "@/components/app/AppToggleDark.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import MobileMenu from "@/components/layouts/MobileMenu.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const showConnectModal = ref(false);
const showUserModal = ref(false);
const showMobileMenu = ref(false);

const ensAccount = ref({});
const { loading, isConnected, shortAddress } = useWallet();
const { blockie } = useWalletExtended();

const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  Faq: "/#Faq",
};

watch(route, () => {
  showMobileMenu.value = false;
});

watch(isConnected, () => {
  if (!isConnected.value) showMobileMenu.value = false;
});
</script>
