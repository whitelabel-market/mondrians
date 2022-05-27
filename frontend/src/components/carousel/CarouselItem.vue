<template>
  <AppImageLoad size="md">
    <template v-slot:image>
      <img
        :src="`${IPFS_BASE_URL}${token.imageURI.replace('ipfs://', '')}`"
        class="object-contain"
        v-show="currentToken === index"
      />
    </template>
  </AppImageLoad>
</template>

<script setup lang="ts">
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import { IPFS_BASE_URL } from "@/utils/constants";

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
