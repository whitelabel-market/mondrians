<template>
  <form class="grid w-full grid-cols-1 gap-2 lg:grid-cols-2" @submit.prevent>
    <div class="w-full col-span-1 space-y-1 text-left lg:col-span-2">
      <span
        class="block text-xs font-semibold transition-colors duration-200 text-neutral-900 dark:text-neutral-400"
      >
        Select Item
      </span>

      <MamoTokenList slider :tokens="tokens" :is-finished="tokens.length > 0">
        <template v-slot:token="{ token }">
          <button
            class="inline-flex text-left transition duration-100 border-2 rounded"
            :class="
              form.token.id === token.id
                ? 'dark:border-neutral-200 border-stone-700'
                : 'border-transparent'
            "
            @click.prevent="!disabled && (form.token = token)"
          >
            <MamoTokenPrint
              :token-id="token?.id"
              :owner="token?.owner?.id"
              :created-at-timestamp="token?.createdAtTimestamp || ''"
              class="transition duration-100"
              :class="form.token.id === token.id ? 'scale-95' : 'scale-100'"
            />
          </button>
        </template>
      </MamoTokenList>
    </div>

    <div class="lg:col-span-2">
      <MamoInput
        v-model="form.name"
        id="print-name"
        type="text"
        placeholder="Name"
        label="Name"
        :error="form.name.length ? errorFields?.name?.[0]?.message : ''"
        :disabled="disabled"
      />
    </div>

    <div class="lg:col-span-2">
      <MamoInput
        v-model="form.email"
        id="print-email"
        type="email"
        placeholder="Email Address"
        label="Email Address"
        :error="form.email.length ? errorFields?.email?.[0]?.message : ''"
        :disabled="disabled"
      />
    </div>

    <div class="lg:col-span-2">
      <MamoInput
        v-model="form.street"
        id="print-street"
        type="text"
        placeholder="Street and house number"
        label="Street and house number"
        :error="form.street.length ? errorFields?.street?.[0]?.message : ''"
        :disabled="disabled"
      />
    </div>

    <MamoInput
      v-model="form.zipCode"
      id="print-zipCode"
      type="text"
      placeholder="Zip Code"
      label="Zip Code"
      :error="form.zipCode.length ? errorFields?.zipCode?.[0]?.message : ''"
      :disabled="disabled"
    />

    <MamoInput
      v-model="form.city"
      id="print-city"
      type="text"
      placeholder="City"
      label="City"
      :error="form.city.length ? errorFields?.city?.[0]?.message : ''"
      :disabled="disabled"
    />

    <div class="z-10 -space-y-1 text-left lg:col-span-2">
      <MamoInputCombobox
        :items="COUNTRIES"
        label="Country"
        placeholder="Country"
        @selected="form.country = $event"
        class="z-50"
      />
    </div>

    <div class="flex items-center justify-start pt-2 space-x-4 lg:col-span-2">
      <MamoButton
        :disabled="!pass || !form.token.hasOwnProperty('id')"
        @click.prevent="submit"
        :loading="loading"
      >
        Submit
      </MamoButton>

      <MamoButton
        :disabled="disabled"
        @click.prevent="emit('skip')"
        color="gray"
        :loading="loading"
        v-if="skippable"
        >Skip for now</MamoButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Rules } from "async-validator";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { useMagicKeys } from "@vueuse/core";
import { COUNTRIES } from "@/utils/constants/countries";
import { MamoButton } from "@/components/Button";
import { MamoInput, MamoInputCombobox } from "@/components/Input";
import { MamoTokenList } from "@/components/TokenList";
import { MamoTokenPrint } from "@/components/Token";

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
  name: [{ type: "string", min: 1, required: true }],
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
    },
  ],
  city: [{ type: "string", required: true }],
  zipCode: [{ type: "string", required: true }],
  country: [
    {
      type: "object",
      fields: {
        name: { type: "string", required: true },
        code: { type: "string", required: true },
      },
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
    emit("submit", { ...form });
  }
};

const { enter } = useMagicKeys();

watch(enter, (v) => {
  if (v) submit();
});
</script>
