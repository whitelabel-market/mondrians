<template>
  <form class="grid lg:grid-cols-2 gap-2 w-full">
    <div class="lg:col-span-2 space-y-1 text-left">
      <span
        class="inline-block text-xs font-semibold text-neutral-900 dark:text-neutral-400"
      >
        Select Item
      </span>
      <TokenList dense slider :tokens="tokens" :is-finished="tokens.length > 0">
        <template v-slot:token="{ token }">
          <button
            class="flex w-full text-left h-full border-2 border-transparent p-4 rounded-lg transition-color duration-200"
            :class="{ 'border-black': form.token.id === token.id }"
            @click.prevent="form.token = token"
          >
            <TokenCardPrint :token="token" />
          </button>
        </template>
      </TokenList>
    </div>

    <div class="lg:col-span-2">
      <AppInput
        v-model="form.name"
        id="print-name"
        type="text"
        placeholder="Name"
        label="Name"
        :error="errorMessage('name')"
      />
    </div>

    <div class="lg:col-span-2">
      <AppInput
        v-model="form.email"
        id="print-email"
        type="email"
        placeholder="Email Address"
        label="Email Address"
        :error="errorMessage('email')"
      />
    </div>

    <div class="lg:col-span-2">
      <AppInput
        v-model="form.street"
        id="print-street"
        type="text"
        placeholder="Street and house number"
        label="Street and house number"
        :error="errorMessage('street')"
      />
    </div>

    <AppInput
      v-model="form.zipCode"
      id="print-zipCode"
      type="text"
      placeholder="Zip Code"
      label="Zip Code"
      :error="errorMessage('zipCode')"
    />

    <AppInput
      v-model="form.city"
      id="print-city"
      type="text"
      placeholder="City"
      label="City"
      :error="errorMessage('city')"
    />

    <div class="lg:col-span-2">
      <AppInput
        class="lg:col-span-2"
        v-model="form.country"
        :error="errorMessage('country')"
        id="print-country"
        type="text"
        placeholder="Country"
        label="Country"
      />
    </div>

    <div class="lg:col-span-2 space-x-4 pt-2 flex justify-start items-center">
      <AppButton :disabled="submitDisabled" @click.prevent="submit">
        Submit
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
import TokenList from "@/components/tokens/TokenList.vue";
import TokenCardPrint from "@/components/tokens/TokenCardPrint.vue";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { Rules } from "async-validator";

const emit = defineEmits(["submit", "skip"]);

const props = defineProps({
  tokens: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const touched = ref(false);

const form = reactive({
  token: {},
  name: "",
  email: "",
  street: "",
  city: "",
  zipCode: "",
  country: "",
});

const rules: Rules = {
  token: [{ type: "object", required: true }],
  name: [{ type: "string", required: true }],
  email: [
    {
      type: "email",
      required: true,
    },
  ],
  street: [{ type: "string", required: true }],
  city: [{ type: "string", required: true }],
  zipCode: [{ type: "string", required: true }],
  country: [{ type: "string", required: true }],
};

const { pass, errorFields } = useAsyncValidator(form, rules, {
  validateOption: { suppressWarning: true },
});

const errorMessage = (key: string) =>
  touched.value &&
  errorFields.value &&
  errorFields.value[key]?.length > 0 &&
  errorFields.value[key][0].message;

const submitDisabled = computed(() => {
  return props.disabled || (touched.value && !pass.value);
});

const submit = () => {
  touched.value = true;
  if (!submitDisabled.value) {
    emit("submit", form);
  }
};
</script>
