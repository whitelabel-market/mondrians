<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Connector from "@/libs/@walletConnector";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    const providers = Connector.init({
      appName: "Mondrians",
      infuraId: "",
      authereum: { key: "" },
      fortmatic: { key: "" },
    }).providers;

    console.log("providers", providers);
  },
});
</script>
