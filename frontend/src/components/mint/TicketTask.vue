<template>
  <form class="space-y-4 flex flex-col w-full">
    <AppInput
      v-model="form.email"
      id="mint-stepper-ticket-email"
      placeholder="Email Address"
      label="Email Address"
      :error="
        touched && errorFields.email?.length > 0 && errorFields.email[0].message
      "
    />

    <div class="space-x-4 flex justify-start items-center">
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

const emit = defineEmits(["submit", "skip"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const touched = ref(false);
const form = reactive({ email: null });
const { pass, isFinished, errorFields, errors } = useAsyncValidator(
  form,
  {
    email: [
      {
        type: "email",
        required: true,
      },
    ],
  },
  { validateOption: { suppressWarning: true } }
);

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
