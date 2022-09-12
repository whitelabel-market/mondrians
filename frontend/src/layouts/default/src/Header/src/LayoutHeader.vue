<template>
  <div>
    <header
      class="fixed top-0 left-0 w-full transition-colors duration-200 bg-white mondrian-border-b z-80 dark:bg-neutral-900"
    >
      <nav
        class="container flex items-center justify-between w-full h-20 max-w-6xl px-8 mx-auto"
      >
        <LayoutHeaderLogo />
        <LayoutHeaderMenuToggle />
        <ul class="items-center hidden space-x-6 text-sm font-semibold lg:flex">
          <li v-for="(to, name) in routes" :key="to">
            <router-link
              class="transition-colors duration-200 link text-neutral-800 dark:text-neutral-200"
              :to="to"
              >{{ name }}</router-link
            >
          </li>
          <li>
            <LayoutHeaderThemeToggle />
          </li>
          <li>
            <MamoButton
              v-if="!isConnected"
              size="sm"
              color="crimson"
              :loading="loading"
              @click.prevent="showConnectModal = true"
            >
              Connect Wallet
            </MamoButton>
            <MamoButton
              v-else
              :center="false"
              size="sm"
              :loading="loading"
              @click.prevent="showUserModal = true"
              color="blank"
              flat
            >
              <img
                v-if="imageExists"
                :src="image"
                :alt="address"
                class="object-cover w-6 h-6 rounded-full"
              />
              <span
                class="font-black duration-200 slashed-zero transitioncolors text-neutral-800 dark:text-neutral-200"
                >{{ ensAccount?.name || shortAddress }}</span
              >
            </MamoButton>
          </li>
        </ul>
      </nav>

      <MamoConnectWalletModal v-model="showConnectModal" />
      <LayoutHeaderUserModal v-model="showUserModal" :ensAccount="ensAccount" />
    </header>
    <LayoutHeaderMenu
      :ensAccount="ensAccount"
      @connect="showConnectModal = true"
      @user="showUserModal = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MamoButton } from "@/components/Button/";
import { MamoConnectWalletModal } from "@/components/WalletModal";
import LayoutHeaderUserModal from "./LayoutHeaderUserModal.vue";
import LayoutHeaderMenu from "./LayoutHeaderMenu.vue";
import LayoutHeaderLogo from "./LayoutHeaderLogo.vue";
import LayoutHeaderMenuToggle from "./LayoutHeaderMenuToggle.vue";
import LayoutHeaderThemeToggle from "./LayoutHeaderThemeToggle.vue";
import { getRoutes } from "@/utils/constants";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

const showConnectModal = ref(false);
const showUserModal = ref(false);

const ensAccount = ref({});
const { loading, isConnected, address, shortAddress, image, imageExists } =
  storeToRefs(useUserStore());

const routes = getRoutes().Home;
</script>
