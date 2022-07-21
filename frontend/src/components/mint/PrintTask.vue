<template>
  <form class="grid w-full gap-2 lg:grid-cols-2" autocomplete="off">
    <div class="space-y-1 text-left lg:col-span-2">
      <span
        class="inline-block text-xs font-semibold text-neutral-900 dark:text-neutral-400"
      >
        Select Item
      </span>
      <TokenList dense slider :tokens="tokens" :is-finished="tokens.length > 0">
        <template v-slot:token="{ token }">
          <button
            class="flex w-full h-full p-2 text-left duration-100 border-2 border-transparent rounded transition-color"
            :class="{
              'border-stone-200 dark:border-stone-700':
                form.token.id === token.id,
            }"
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
        :error="form.name.length ? errorFields?.name?.[0]?.message : ''"
      />
    </div>

    <div class="lg:col-span-2">
      <AppInput
        v-model="form.email"
        id="print-email"
        type="email"
        placeholder="Email Address"
        label="Email Address"
        :error="form.email.length ? errorFields?.email?.[0]?.message : ''"
      />
    </div>

    <div class="lg:col-span-2">
      <AppInput
        v-model="form.street"
        id="print-street"
        type="text"
        placeholder="Street and house number"
        label="Street and house number"
        :error="form.street.length ? errorFields?.street?.[0]?.message : ''"
      />
    </div>

    <AppInput
      v-model="form.zipCode"
      id="print-zipCode"
      type="text"
      placeholder="Zip Code"
      label="Zip Code"
      :error="form.zipCode.length ? errorFields?.zipCode?.[0]?.message : ''"
    />

    <AppInput
      v-model="form.city"
      id="print-city"
      type="text"
      placeholder="City"
      label="City"
      :error="form.city.length ? errorFields?.city?.[0]?.message : ''"
    />

    <div class="lg:col-span-2">
      <AppInput
        class="lg:col-span-2"
        v-model="form.country"
        :error="form.country.length ? errorFields?.country?.[0]?.message : ''"
        id="print-country"
        type="text"
        placeholder="Country"
        label="Country"
      />
    </div>

    <div class="flex items-center justify-start pt-2 space-x-4 lg:col-span-2">
      <AppButton :disabled="!pass" @click.prevent="submit" :loading="loading">
        Submit
      </AppButton>

      <AppButton
        :disabled="disabled"
        @click.prevent="emit('skip')"
        color="gray"
        :loading="loading"
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
import TokenList from "@/components/tokens/TokenList.vue";
import TokenCardPrint from "@/components/tokens/TokenCardPrint.vue";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { Rules } from "async-validator";

const emit = defineEmits(["submit", "skip"]);

defineProps({
  tokens: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  skippable: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const form = reactive({
  token: {},
  name: "",
  email: "",
  street: "",
  city: "",
  zipCode: "",
  country: "",
});

// Form validation

const touched = ref(false);

const rules: Rules = {
  token: [{ type: "object", required: true }],
  name: [{ type: "string", min: 1, max: 40, required: true }],
  email: [
    {
      type: "email",
      required: true,
    },
  ],
  street: [
    {
      type: "string",
      required: true,
      pattern: /\d/,
      message: "missing house number",
    },
  ],
  city: [{ type: "string", required: true }],
  zipCode: [{ type: "string", required: true }],
  country: [{ type: "string", required: true }],
};

const { pass, errorFields } = useAsyncValidator(form, rules, {
  validateOption: { suppressWarning: true },
});

const submit = () => {
  touched.value = true;
  if (pass.value) {
    emit("submit", { ...form });
  }
};
</script>
