<template>
  <form action="" method="POST" class="space-y-4 flex flex-col w-full">
    <AppInput
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', modelValue)"
      id="mint-stepper-ticket-email"
      type="email"
      placeholder="Email Address"
      label="Email Address"
    />

    <div class="space-x-4 flex justify-start items-center">
      <AppButton @click.prevent="emit('submit', modelValue)">
        Register
      </AppButton>

      <AppButton @click.prevent="emit('skip')" color="gray"
        >Skip for now</AppButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import AppInput from "@/components/app/AppInput.vue";

const emit = defineEmits(["update:modelValue", "submit", "skip"]);

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
</script>
