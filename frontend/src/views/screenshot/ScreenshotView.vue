<template>
  <MamoTokenPrint
    :created-at-timestamp="createdAtTimestamp"
    :owner="owner"
    :tokenId="tokenId"
  />
</template>

<script setup lang="ts">
import { MamoTokenPrint } from "@/components/Token";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

useHead({
  title: "Screenshot",
});

const emit = defineEmits(["loaded"]);

const route = useRoute();

const { createdAtTimestamp, owner, tokenId } = route.query as {
  createdAtTimestamp: string;
  owner: string;
  tokenId: string;
};

onMounted(() => emit("loaded", true));
</script>
