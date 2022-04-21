<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center pt-2 space-x-4">
      <div class="flex items-center justify-center w-10 h-10">
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col">
        <span class="text-base font-bold leading-5">
          <slot name="name"></slot>
        </span>
        <span class="text-sm text-left rounded-xl">
          <slot name="description"></slot>
          <slot name="error"></slot>
        </span>
      </div>
    </div>
  </div>
</template>
