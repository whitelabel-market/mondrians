<template>
  <form class="space-y-4 flex flex-col w-full">
    <AppInput
      v-model="email"
      id="mint-stepper-ticket-email"
      type="email"
      placeholder="Email Address"
      label="Email Address"
    />

    <div class="space-x-4 flex justify-start items-center">
      <AppButton :disabled="disabled" @click.prevent="emit('submit', email)">
        Register
      </AppButton>

      <AppButton :disabled="disabled" @click.prevent="emit('skip')" color="gray"
        >Skip for now</AppButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import AppInput from "@/components/app/AppInput.vue";
import { ref } from "vue";

const emit = defineEmits(["submit", "skip"]);

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const email = ref("");
</script>
