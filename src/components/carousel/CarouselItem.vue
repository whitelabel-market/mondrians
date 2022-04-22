<template>
  <AppImageLoad>
    <template v-slot:image>
      <img
        :src="`https://ipfs.io/ipfs/${token.imageURI.replace('ipfs://', '')}`"
        class="object-contain"
        v-show="currentToken === index"
      />
    </template>
    <template v-slot:preloader>
      <AppLoadingSpinner :size="'md'" v-show="currentToken === index" />
    </template>
  </AppImageLoad>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

export default defineComponent({
  components: {
    AppImageLoad,
    AppLoadingSpinner,
  },
  props: {
    token: {
      type: Object,
      required: true,
    },
    currentToken: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
});
</script>
