<template>
  <div>
    <LayoutHeader />
    <main class="h-full">
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import LayoutFooter from "@/components/layouts/LayoutFooter.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import useTransition from "@/composables/useTransition";
import { useWalletProvider } from "@/composables/useWallet";

import { defineComponent } from "vue";
export default defineComponent({
  components: { LayoutHeader, LayoutFooter },
  setup() {
    useTransition();
    useWalletProvider();
  },
});
</script>
