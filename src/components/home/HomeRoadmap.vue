<template>
  <section id="Roadmap" class="bg-blueish text-white mondrian-border-bottom">
    <div class="container px-8 mx-auto grid gap-4 lgs:grid-cols-3 items-center">
      <div class="lgs:col-span-2 grid md:grid-cols-3 items-stretch gap-4">
        <div class="md:col-span-3 space-y-2 max-w-xl">
          <div class="relative z-10 text-5xl font-bold gs_reveal">
            Roadmap
            <span
              class="text-[#AC0C11] text-[2.5rem] font-normal tracking-[0.25em] font-serif absolute -left-4 top-0 -z-10"
              >Roadmap</span
            >
          </div>
          <p class="gs_reveal">
            This roadmap outlines our goals and where we want to take
            Mondrian’s. We have a lot of idead and concepts that we are working
            on.
          </p>
        </div>

        <div
          class="gs_reveal border-8 border-black p-4 md:p-8 space-y-2 bg-blue-300 text-black"
          :class="step?.classes || ''"
          v-for="(step, index) of steps"
          :key="step.title"
        >
          <div class="flex items-start space-x-2">
            <div
              class="inline-flex w-6 h-6 rounded-full font-bold bg-black text-white items-center justify-center text-sm flex-shrink-0 flex-grow-0"
            >
              <span class="block">{{ index + 1 }}</span>
            </div>
            <h6 class="font-bold uppercase">
              {{ step.title }}
            </h6>
          </div>

          <p class="text-sm">
            {{ step.description }}
          </p>
        </div>
      </div>
      <img
        src="@/assets/images/image-2.png"
        alt="Roadmap"
        class="gs_reveal gs_reveal_fromLeft order-first max-w-sm w-full lgs:order-none"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import useTransition from "@/composables/useTransition";
useTransition();

const steps = [
  {
    title: "Launch",
    description:
      "Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.",
    classes: "bg-white",
  },
  {
    title: "Community Giveaway",
    description:
      "Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.",
    classes: "bg-white",
  },
  {
    title: "Merchandise Drop",
    description:
      "Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.",
    classes: "bg-white",
  },
  {
    title: "Collaboration",
    description:
      "Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.",
    classes: "bg-white",
  },
  {
    title: "Future Drops",
    description:
      "Lorem ipsum dolor sit amet, consetetur adipiscing elit, sed do ciusmod tempor incididunt ut labore et dolore magna aliqua.",
    classes: "bg-white",
  },
];
</script>
