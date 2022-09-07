<template>
  <section
    id="Roadmap"
    class="transition-colors duration-200 text-neutral-50 bg-dodgerblue-500 dark:bg-dodgerblue-900 mondrian-border-b"
  >
    <div class="container grid items-center gap-4 px-8 mx-auto lgs:grid-cols-7">
      <div
        class="grid items-stretch gap-6 lgs:col-span-5 md:grid-cols-3"
        v-animate.stagger
      >
        <div class="max-w-2xl space-y-6 md:col-span-3">
          <h2 class="section-title" v-animate>Roadmap</h2>
          <p class="" v-animate>
            This roadmap outlines our goals and where we want to take
            Mondrian’s. We have a lot of ideas and concepts that we are working
            on.
          </p>
        </div>
        <div v-for="(step, index) of steps" :key="step.title">
          <div
            class="p-4 space-y-2 transition-colors duration-200 border-4 border-black rounded bg-dodgerblue-50 dark:bg-dodgerblue-800 text-neutral-800 dark:text-neutral-200 md:p-8"
            :class="step?.classes || ''"
          >
            <div
              class="inline-flex items-center justify-center flex-grow-0 flex-shrink-0 w-6 h-6 text-sm font-semibold rounded-full text-neutral-200 bg-neutral-800"
            >
              <span class="block">{{ index + 1 }}</span>
            </div>

            <h6 class="font-bold uppercase">
              {{ step.title }}
            </h6>

            <p class="text-sm">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
      <img
        v-animate
        src="@/assets/images/image-2.png"
        alt="Roadmap"
        class="order-first w-full max-w-sm mx-auto lgs:order-none lgs:col-span-2"
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
