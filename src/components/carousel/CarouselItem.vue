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

<script setup lang="ts">
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

defineProps({
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
});
</script>
