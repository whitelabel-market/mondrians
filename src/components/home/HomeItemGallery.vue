<template>
  <section id="Gallery" class="">
    <div class="px-4 overflow-hidden">
      <div class="md:hidden space-y-4">
        <div
          class="flex space-x-4"
          v-for="(row, index) in [0, 6, 4]"
          :class="
            index % 2 === 0 ? '-ml-20 justify-start' : '-mr-20 justify-end'
          "
          :key="'mobile ' + index"
        >
          <div
            class="border-8 border-black shadow-xl flex-shrink-0 flex-grow-0"
            v-for="col in 5"
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
      <div class="mdx:hidden space-y-4">
        <div
          class="flex space-x-4"
          v-for="(row, index) in [0, 5]"
          :class="
            index % 2 === 0 ? '-ml-40 justify-start' : '-mr-40 justify-end'
          "
          :key="'desktop ' + index"
        >
          <div
            class="border-8 border-black shadow-xl flex-shrink-0 flex-grow-0"
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
