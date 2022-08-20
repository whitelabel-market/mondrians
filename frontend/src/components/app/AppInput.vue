<template>
  <div class="relative w-full text-left">
    <label
      :for="id"
      class="inline-block text-xs font-semibold text-neutral-900 dark:text-neutral-400"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        v-bind="$attrs"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :id="id"
        :name="id"
        ref="inputRef"
        :type="type"
        class="w-full h-12 px-4 text-current transition-colors duration-1000 bg-white border-2 rounded focus:outline-none dark:bg-neutral-900 focus:border-current focus:ring-0 focus:border-neutral-800 dark:focus:border-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 ease-in-circ"
        :class="
          error ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'
        "
      />
      <slot />
    </div>

    <p class="text-red-500" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps(["modelValue", "label", "id", "type", "error"]);
const emit = defineEmits(["update:modelValue", "submit", "inputRefLoaded"]);
const inputRef = ref();

onMounted(() => {
  emit("inputRefLoaded", inputRef);
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
};
</script>
