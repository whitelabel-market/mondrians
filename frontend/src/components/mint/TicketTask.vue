<template>
  <form class="flex flex-col w-full space-y-4">
    <AppInput
      v-model="form.email"
      id="mint-stepper-ticket-email"
      placeholder="Email Address"
      label="Email Address"
      :error="form.email?.length ? errorFields?.email?.[0]?.message : ''"
    />

    <div class="flex items-center justify-start space-x-4">
      <AppButton :disabled="submitDisabled" @click.prevent="submit">
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
import { computed, reactive, ref } from "vue";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { Rules } from "async-validator";

const emit = defineEmits(["submit", "skip"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const touched = ref(false);
const form = reactive({ email: null });

const rules: Rules = {
  email: [
    {
      type: "email",
      required: true,
    },
  ],
};

const { pass, errorFields } = useAsyncValidator(form, rules, {
  validateOption: { suppressWarning: true },
});

const submitDisabled = computed(() => {
  return props.disabled || (touched.value && !pass.value);
});

const submit = () => {
  touched.value = true;
  if (!submitDisabled.value) {
    emit("submit", form.email);
  }
};
</script>
