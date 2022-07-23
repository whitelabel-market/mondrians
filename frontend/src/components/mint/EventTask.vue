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
      <AppButton :disabled="!pass" @click.prevent="submit" :loading="loading">
        Register
      </AppButton>

      <AppButton
        :disabled="disabled"
        @click.prevent="emit('skip')"
        color="gray"
        v-if="skippable"
        >Skip for now</AppButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import AppInput from "@/components/app/AppInput.vue";
import { reactive, ref } from "vue";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { Rules } from "async-validator";

const emit = defineEmits(["submit", "skip"]);

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  skippable: {
    type: Boolean,
    default: false,
  },
  loading: {
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

const submit = () => {
  touched.value = true;
  if (pass.value) {
    emit("submit", form.email);
  }
};
</script>
