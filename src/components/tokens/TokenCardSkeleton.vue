<template>
  <div class="flex flex-col justify-between h-full gap-3 p-4">
    <dd
      class="flex justify-end -space-x-6 sm:justify-start lg:justify-end xl:justify-start"
    >
      <div
        class="w-6 h-6 bg-gray-200 rounded-full hover:cursor-pointer animate-pulse"
      ></div>
    </dd>
    <div class="flex items-center justify-center w-full aspect-square">
      <div class="bg-gray-200"></div>
    </div>
    <div class="flex items-center justify-between">
      <div
        class="w-16 h-6 bg-gray-200 rounded-full animate-pulse"
        style="animation-delay: 150ms; animation-fill-mode: backwards"
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <div
          class="w-32 h-3 bg-gray-200 rounded-full animate-pulse"
          style="animation-delay: 300ms; animation-fill-mode: backwards"
        ></div>
        <div
          class="w-24 h-3 bg-gray-200 rounded-full animate-pulse"
          style="animation-delay: 300ms; animation-fill-mode: backwards"
        ></div>
      </div>
    </div>
  </div>
</template>
