<template>
  <AppTooltip :show="show">
    <template v-slot:element>
      <AppButton
        class="p-2 text-gray-700 border border-gray-200 rounded-full active:scale-[0.95] hover:text-blueish"
        :color="'custom'"
        @clicked="$emit('clicked', item.content)"
        @mouseenter="show = true"
        @mouseleave="show = false"
      >
        <component :is="components[item.icon]" class="w-5 h-5" />
      </AppButton>
    </template>
    <template #text>{{ item.tooltip }}</template>
  </AppTooltip>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppTooltip from "../app/AppTooltip.vue";
import AppButton from "../app/AppButton.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import { PlusIcon, MailIcon } from "@heroicons/vue/solid";

const components = { FacebookIcon, TwitterIcon, PlusIcon, MailIcon };

const show = ref(false);

defineEmits(["clicked"]);

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
