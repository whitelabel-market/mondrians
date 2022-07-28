<template>
  <section
    id="Gallery"
    class="transition-colors duration-100 bg-white mondrian-border-b dark:bg-neutral-900"
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
