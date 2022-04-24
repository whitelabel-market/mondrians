<template>
  <div
    class="grid grid-cols-6 grid-rows-1 px-3 py-2 font-medium text-gray-900 border-t-2 border-l-2 border-r-2 border-gray-100 rounded-t-lg gap-x-2"
  >
    <div>Event</div>
    <div>From</div>
    <div>To</div>
    <div>Amount</div>
    <div>Gas</div>
    <div>Date</div>
  </div>
  <div
    v-for="(transfer, index) of 3"
    :key="transfer.id"
    :index="index"
    class="grid grid-cols-6 grid-rows-1 px-3 py-2 text-base text-gray-700 border-2 border-gray-100 h-14 gap-x-2"
    :class="[index > 0 && 'border-t-0', index === 2 && 'rounded-b-lg']"
  >
    <div class="flex items-center space-x-2">
      <div
        class="w-5 h-5 bg-gray-200 rounded-full animate-pulse"
        :style="[
          index === 1 &&
            'animation-delay: 150ms; animation-fill-mode: backwards',
          index === 2 &&
            'animation-delay: 300ms; animation-fill-mode: backwards',
        ]"
      />
      <span
        class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
        :style="[
          index === 1 &&
            'animation-delay: 150ms; animation-fill-mode: backwards',
          index === 2 &&
            'animation-delay: 300ms; animation-fill-mode: backwards',
        ]"
      ></span>
    </div>
    <div class="flex">
      <div class="flex items-center space-x-2">
        <div
          class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
          :style="[
            index === 1 &&
              'animation-delay: 150ms; animation-fill-mode: backwards',
            index === 2 &&
              'animation-delay: 300ms; animation-fill-mode: backwards',
          ]"
        />
        <span
          class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
          :style="[
            index === 1 &&
              'animation-delay: 150ms; animation-fill-mode: backwards',
            index === 2 &&
              'animation-delay: 300ms; animation-fill-mode: backwards',
          ]"
        ></span>
      </div>
    </div>
    <div class="flex">
      <div class="flex items-center space-x-2">
        <div
          class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
          :style="[
            index === 1 &&
              'animation-delay: 150ms; animation-fill-mode: backwards',
            index === 2 &&
              'animation-delay: 300ms; animation-fill-mode: backwards',
          ]"
        />
        <span
          class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
          :style="[
            index === 1 &&
              'animation-delay: 150ms; animation-fill-mode: backwards',
            index === 2 &&
              'animation-delay: 300ms; animation-fill-mode: backwards',
          ]"
        ></span>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
        :style="[
          index === 1 &&
            'animation-delay: 150ms; animation-fill-mode: backwards',
          index === 2 &&
            'animation-delay: 300ms; animation-fill-mode: backwards',
        ]"
      ></span>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
        :style="[
          index === 1 &&
            'animation-delay: 150ms; animation-fill-mode: backwards',
          index === 2 &&
            'animation-delay: 300ms; animation-fill-mode: backwards',
        ]"
      ></span>
    </div>
    <div class="flex items-center">
      <span
        class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"
        :style="[
          index === 1 &&
            'animation-delay: 150ms; animation-fill-mode: backwards',
          index === 2 &&
            'animation-delay: 300ms; animation-fill-mode: backwards',
        ]"
      ></span>
    </div>
  </div>
</template>
