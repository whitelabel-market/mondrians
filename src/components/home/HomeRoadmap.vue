<template>
  <section id="Roadmap" class="text-white bg-blueish mondrian-border-b">
    <div class="container grid items-center gap-4 px-8 mx-auto lgs:grid-cols-3">
      <div class="grid items-stretch gap-4 lgs:col-span-2 md:grid-cols-3">
        <div class="max-w-xl space-y-2 md:col-span-3">
          <h2 class="section-title" v-animate>Roadmap</h2>
          <p class="pb-4" v-animate>
            This roadmap outlines our goals and where we want to take
            Mondrian’s. We have a lot of ideas and concepts that we are working
            on.
          </p>
        </div>

        <div
          class="p-4 space-y-2 text-neutral-900 bg-blue-100 border-4 border-neutral-800 rounded-xl md:p-8"
          v-animate
          :class="step?.classes || ''"
          v-for="(step, index) of steps"
          :key="step.title"
        >
          <div class="flex items-start space-x-2">
            <div
              class="inline-flex items-center justify-center flex-grow-0 flex-shrink-0 w-6 h-6 text-sm font-bold text-neutral-200 bg-neutral-800 rounded-full"
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
        class="order-first w-full max-w-sm mx-auto lgs:order-none"
        v-animate
      />
    </div>
  </section>
</template>

<script setup lang="ts">
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
