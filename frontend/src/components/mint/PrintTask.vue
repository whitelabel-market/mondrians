<template>
  <form action="" method="POST" class="grid lg:grid-cols-2 gap-2 w-full">
    <AppInput
      :modelValue="modelValue.firstName"
      @update:modelValue="updateModel('firstName', $event)"
      id="print-firstName"
      type="text"
      placeholder="First Name"
      label="First Name"
    />

    <AppInput
      :modelValue="modelValue.lastName"
      @update:modelValue="updateModel('lastName', $event)"
      id="print-lastName"
      type="text"
      placeholder="Last Name"
      label="Last Name"
    />

    <div class="lg:col-span-2">
      <AppInput
        :modelValue="modelValue.email"
        @update:modelValue="updateModel('email', $event)"
        id="print-email"
        type="text"
        placeholder="Email Address"
        label="Email Address"
      />
    </div>

    <AppInput
      :modelValue="modelValue.streetName"
      @update:modelValue="updateModel('streetName', $event)"
      id="print-streetName"
      type="text"
      placeholder="Street Name"
      label="Street Name"
    />

    <AppInput
      :modelValue="modelValue.streetNumber"
      @update:modelValue="updateModel('streetNumber', $event)"
      id="print-streetNumber"
      type="number"
      placeholder="Street Number"
      label="Street Number"
    />

    <AppInput
      :modelValue="modelValue.city"
      @update:modelValue="updateModel('city', $event)"
      id="print-city"
      type="text"
      placeholder="City"
      label="City"
    />

    <AppInput
      :modelValue="modelValue.zipCode"
      @update:modelValue="updateModel('zipCode', $event)"
      id="print-zipCode"
      type="text"
      placeholder="Zip Code"
      label="Zip Code"
    />

    <div class="lg:col-span-2">
      <AppInput
        class="lg:col-span-2"
        :modelValue="modelValue.country"
        @update:modelValue="updateModel('country', $event)"
        id="print-country"
        type="text"
        placeholder="Country"
        label="Country"
      />
    </div>

    <div class="lg:col-span-2 space-x-4 pt-2 flex justify-start items-center">
      <AppButton @click.prevent="emit('submit', modelValue)"> Send </AppButton>

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

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const updateModel = (key: string, value: any) => {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};
</script>
