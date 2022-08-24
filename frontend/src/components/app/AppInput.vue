<template>
  <div class="relative w-full text-left">
    <label
      :for="id"
      class="inline-block text-xs font-semibold transition-colors duration-200 text-neutral-900 dark:text-neutral-400"
    >
      {{ label }}
    </label>

    <div class="relative">
      <div
        :class="
          error ? 'border-red-500' : 'border-stone-200 dark:border-stone-700'
        "
        class="transition-colors duration-200 bg-white border-2 rounded dark:bg-neutral-800 focus:border-neutral-800 dark:focus:border-neutral-200"
      >
        <div
          class="transition-colors duration-200 bg-transparent text-neutral-800 dark:text-neutral-200"
        >
          <input
            v-bind="$attrs"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            :id="id"
            :name="id"
            ref="inputRef"
            :type="type"
            class="w-full h-12 px-4 text-current bg-transparent border-0 focus:outline-none focus:border-current focus:ring-0 placeholder:text-neutral-400 dark:placeholder:text-neutral-400"
            :class="
              error
                ? 'border-red-500'
                : 'border-stone-200 dark:border-stone-700'
            "
          />
        </div>
      </div>
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
