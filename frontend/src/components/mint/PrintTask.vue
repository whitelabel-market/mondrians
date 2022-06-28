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
            class="flex w-full text-left h-full border-2 border-transparent p-4 rounded-2xl transition-color duration-200 ease-out-circ"
            :class="{ 'border-black': data.token.id === token.id }"
            @click.prevent="data.token = token"
          >
            <TokenCardPrint :token="token" />
          </button>
        </template>
      </TokenList>
    </div>

    <AppInput
      v-model="data.firstName"
      id="print-firstName"
      type="text"
      placeholder="First Name"
      label="First Name"
    />

    <AppInput
      v-model="data.lastName"
      id="print-lastName"
      type="text"
      placeholder="Last Name"
      label="Last Name"
    />

    <div class="lg:col-span-2">
      <AppInput
        v-model="data.email"
        id="print-email"
        type="email"
        placeholder="Email Address"
        label="Email Address"
      />
    </div>

    <template v-if="manualAddress">
      <AppInput
        v-model="data.streetName"
        id="print-streetName"
        type="text"
        placeholder="Street Name"
        label="Street Name"
      />

      <AppInput
        v-model="data.streetNumber"
        id="print-streetNumber"
        type="number"
        placeholder="Street Number"
        label="Street Number"
      />

      <AppInput
        v-model="data.city"
        id="print-city"
        type="text"
        placeholder="City"
        label="City"
      />

      <AppInput
        v-model="data.zipCode"
        id="print-zipCode"
        type="text"
        placeholder="Zip Code"
        label="Zip Code"
      />

      <div class="lg:col-span-2">
        <AppInput
          class="lg:col-span-2"
          v-model="data.country"
          id="print-country"
          type="text"
          placeholder="Country"
          label="Country"
        />
      </div>
    </template>

    <div class="lg:col-span-2" v-if="!manualAddress">
      <AppInput
        v-model="address"
        id="print-address"
        type="text"
        placeholder="Address"
        label="Address"
      />

      <div class="flex items-center lg:justify-end pt-4 pb-8 space-x-1">
        <span class="block uppercase text-xs">or</span>
        <AppButton @click.prevent="manualAddress = true" color="gray" size="xs">
          Manually enter Address
        </AppButton>
      </div>
    </div>

    <div class="lg:col-span-2 space-x-4 pt-2 flex justify-start items-center">
      <AppButton :disabled="disabled" @click.prevent="emit('submit', data)">
        Send
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
import { reactive, ref } from "vue";
import TokenList from "@/components/tokens/TokenList.vue";
import TokenCard from "@/components/tokens/TokenCard.vue";
import TokenCardPrint from "@/components/tokens/TokenCardPrint.vue";

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

const manualAddress = ref(false);
const address = ref("");

const data = reactive({
  token: props.tokens.length > 0 ? props.tokens[0] : {},
  firstName: "",
  lastName: "",
  email: "",
  streetName: "",
  streetNumber: null,
  city: "",
  zipCode: "",
  country: "",
});
</script>
