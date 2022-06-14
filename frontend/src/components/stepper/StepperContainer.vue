<template>
  <div>
    <TabGroup>
      <TabList v-slot="{ selectedIndex }" class="flex w-full items-center">
        <Tab
          v-for="(step, i) in steps"
          :key="i"
          class="block flex-1 relative"
          :disabled="step.props.disabled"
        >
          <div
            class="flex flex-col text-center items-center space-y-2 px-4 py-2 w-auto opacity-25"
            :class="{ '!opacity-100': selectedIndex >= i }"
          >
            <div
              class="flex rounded-full w-8 h-8 items-center justify-center bg-gray-900 text-white"
            >
              {{ i + 1 }}
            </div>
            <span class="block text-center">
              {{ step.props.title }}
            </span>
            <div
              v-if="i < step.length - 1"
              class="absolute top-4 left-1/2 -right-1/2 transform -translate-y-1/2 -z-10"
            >
              <span
                class="block absolute left-8 right-8 h-px bg-white bg-opacity-50"
              >
              </span>
            </div>
          </div>
        </Tab>
      </TabList>
      <TabPanels>
        <slot />
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, defineEmits } from "vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/vue";

const emit = defineEmits(["select"]);

const slots = useSlots();
const steps: typeof StepperItem[] = slots.default();
</script>

<style scoped></style>
