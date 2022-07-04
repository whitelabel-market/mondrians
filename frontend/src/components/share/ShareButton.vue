<template>
  <AppButton
    @click="$emit('click', item.content)"
    :tooltip="item.tooltip"
    only-icon
    size="sm"
    rounded="full"
  >
    <component :is="components[item.icon]" class="w-4 h-4" />
    <span
      v-if="hintVisible && index !== 3"
      class="absolute -top-0.5 -right-0.5 flex w-2 h-2"
    >
      <span
        class="absolute inline-flex w-full h-full rounded-full opacity-75 bg-reddish animate-ping"
      ></span>
      <span class="relative inline-flex w-2 h-2 bg-red-500 rounded-lg"></span>
    </span>
  </AppButton>
</template>

<script setup lang="ts">
import AppButton from "../app/AppButton.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import { PlusIcon, MailIcon } from "@heroicons/vue/solid";

const components = { FacebookIcon, TwitterIcon, PlusIcon, MailIcon };

defineEmits(["click"]);

defineProps({
  item: {
    type: Object,
    required: true,
  },
  hintVisible: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
