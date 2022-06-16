<template>
  <div class="w-full space-y-1">
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
        :type="type"
        class="w-full h-12 focus:ring-0 focus:border-black focus:italic outline-none border-2 border-black placeholder:text-neutral-200 dark:placeholder:text-neutral-400 text-current rounded-xl bg-white dark:bg-neutral-800 transition-colors duration-200 ease-in-out"
      />
      <button
        v-if="inlineSubmit"
        class="absolute flex items-center justify-center py-2 px-4 text-current text-xs top-0 right-0 h-full rounded-xl"
        type="submit"
        @click.prevent="inlineSubmit && $emit('submit', modelValue)"
      >
        <slot />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["modelValue", "label", "id", "type", "inlineSubmit"],
  emits: ["update:modelValue", "submit"],
};
</script>
