<template>
  <div class="w-full text-left">
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
        class="w-full h-12 focus:ring-0 focus:border-black outline-none border-2 border-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 text-current rounded-xl bg-neutral-100 dark:bg-neutral-800 transition-colors duration-200 ease-in-circ"
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
