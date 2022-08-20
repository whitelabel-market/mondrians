<template>
  <section
    id="Gallery"
    class="transition-colors duration-1000 bg-white mondrian-border-b dark:bg-neutral-900"
    ref="outer"
  >
    <div class="px-8 overflow-hidden">
      <div class="space-y-4 md:hidden">
        <div
          class="flex space-x-4"
          v-for="(row, index) in [0, 6, 4]"
          :class="
            index % 2 === 0 ? '-ml-20 justify-start' : '-mr-20 justify-end'
          "
          :key="'mobile ' + index"
          ref="innerMobile"
        >
          <div
            class="flex-grow-0 flex-shrink-0 border-4 border-black shadow-xl"
            v-for="col in 5"
            v-animate.stagger
            :key="'mobile ' + col + index"
          >
            <img
              :src="require('@/assets/images/pattern-' + (col + row) + '.png')"
              class="w-40"
              :alt="'Mondrians Item ' + (col + row)"
            />
          </div>
        </div>
      </div>
      <div class="space-y-4 mdx:hidden">
        <div
          class="flex space-x-4"
          v-for="(row, index) in [0, 5]"
          :class="
            index % 2 === 0 ? '-ml-40 justify-start' : '-mr-40 justify-end'
          "
          :key="'desktop ' + index"
          v-animate.stagger
          ref="innerDesktop"
        >
          <div
            class="flex-grow-0 flex-shrink-0 border-4 border-black shadow-xl"
            v-for="col in 7"
            :key="'desktop ' + col + index"
          >
            <img
              :src="require('@/assets/images/pattern-' + (col + row) + '.png')"
              class="w-56"
              :alt="'Mondrians Item ' + (col + row)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const outer = ref(null);
const innerMobile = ref<Array<any>>([]);
const innerDesktop = ref<Array<any>>([]);

const slideOnScroll = (els: Array<any>, by: number) =>
  els.forEach((el, i) => {
    const [xStart, xEnd] = i % 2 === 0 ? [by, -1 * by] : [-1 * by, by];
    gsap.fromTo(
      el,
      { xPercent: xStart },
      {
        xPercent: xEnd,
        scrollTrigger: {
          trigger: outer.value,
          scrub: 0,
          start: "top bottom",
        },
      }
    );
  });

onMounted(() => {
  slideOnScroll(innerMobile.value, 32);
  slideOnScroll(innerDesktop.value, 16);
});
</script>
