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
        @input="$emit('update:modelValue', $event.target.value)"
        :id="id"
        :name="id"
        ref="inputRef"
        :type="type"
        class="w-full h-12 px-4 text-current transition-colors bg-white border-2 rounded-lg outline-none 3200 focus:ring-0 dark:focus:border-stone-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 dark:bg-neutral-900 ease-in-circ"
        :class="
          error ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'
        "
      />
      <button
        v-if="inlineSubmit"
        class="absolute top-0 right-0 flex items-center justify-center h-full px-4 py-2 text-xs text-current rounded-lg"
        type="submit"
        @click.prevent="inlineSubmit && $emit('submit', modelValue)"
      >
        <slot />
      </button>
    </div>

    <p class="text-red-500" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps(["modelValue", "label", "id", "type", "inlineSubmit", "error"]);
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
