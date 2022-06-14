<template>
  <div>
    <TabGroup>
      <TabList
        v-slot="{ selectedIndex }"
        class="py-8 bg-reddish mondrian-border-b text-white bg-hero-pattern-charlie"
      >
        <div class="container px-8 mx-auto">
          <div class="py-24">
            <h1 class="text-center font-bold text-4xl leading-relaxed">
              Create your <LogoIcon class="text-4xl" />
            </h1>
          </div>
          <div class="flex items-stretch justify-stretch">
            <Tab
              v-for="(step, i) in steps"
              :key="i"
              class="block relative flex-1 flex flex-col justify-start items-center"
              :disabled="step.props.disabled"
            >
              <div
                class="flex flex-col text-center items-center space-y-2 px-4 py-2 w-auto opacity-50"
                :class="{ '!opacity-100': selectedIndex >= i }"
              >
                <div
                  class="flex rounded-full w-6 h-6 items-center justify-center bg-black text-xs text-white"
                >
                  {{ i + 1 }}
                </div>
                <span class="block text-center">
                  {{ step.props.title }}
                </span>
                <div
                  v-if="i < steps.length - 1"
                  class="absolute top-2.5 left-1/2 -right-1/2 transform -translate-y-1/2 z-10"
                >
                  <span class="block absolute left-8 right-8 h-px bg-black">
                  </span>
                </div>
              </div>
            </Tab>
          </div>
        </div>
      </TabList>
      <TabPanels>
        <div class="container px-8 mx-auto">
          <slot />
        </div>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const slots = useSlots();
const steps = slots.default?.() as unknown as typeof StepperItem[];
</script>

<style scoped></style>
