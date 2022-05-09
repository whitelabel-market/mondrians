<template>
  <section id="Roadmap" class="bg-blueish text-white mondrian-border-b">
    <div class="container px-8 mx-auto grid gap-4 lgs:grid-cols-3 items-center">
      <div class="lgs:col-span-2 grid md:grid-cols-3 items-stretch gap-4">
        <div class="md:col-span-3 space-y-2 max-w-xl">
          <h2 class="section-title" v-animate>Roadmap</h2>
          <p class="pb-4" v-animate>
            This roadmap outlines our goals and where we want to take
            Mondrian’s. We have a lot of ideas and concepts that we are working
            on.
          </p>
        </div>

        <div
          class="border-8 border-black p-4 md:p-8 space-y-2 bg-blue-100 text-black"
          v-animate
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
        class="order-first max-w-sm w-full lgs:order-none"
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
