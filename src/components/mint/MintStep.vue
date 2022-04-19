<template>
  <div class="flex items-center justify-center w-10 h-10">
    <AppLoadingSpinner v-if="step.status === 'pending'" />
    <component
      :is="type"
      v-else
      class="w-10 h-10 transform translate-x-0.5"
      :class="step.status === 'success' ? 'text-blueish' : 'text-gray-200'"
    />
  </div>
  <div class="flex flex-col">
    <span class="text-base font-bold leading-5">
      <slot name="name"></slot>
    </span>
    <span class="text-sm text-left rounded-xl">
      <slot name="description"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon, XIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    AppLoadingSpinner,
    CheckIcon,
    XIcon,
  },
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const type = computed(() => {
      if (props.step.status === "success") return "CheckIcon";
      if (props.step.status === "scheduled") return "CheckIcon";
      if (props.step.status === "error") return "XIcon";
      return "";
    });
    return { type };
  },
});
</script>
