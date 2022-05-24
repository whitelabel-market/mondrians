<template>
  <div class="flex items-center justify-center w-full">
    <div class="flex items-center justify-center w-full">
      <label for="toggle-dark" class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <input
            ref="slider"
            type="checkbox"
            id="toggle-dark"
            class="sr-only"
            @click.prevent="toggleDark()"
          />
          <!-- background -->
          <div
            class="block bg-neutral-200 dark:bg-neutral-800 w-14 h-8 rounded-full transition duration-300"
          ></div>
          <!-- dot -->
          <div
            class="absolute flex items-center justify-center left-1 top-1 bg-neutral-800 dark:bg-neutral-200 w-6 h-6 rounded-full transition duration-300"
            :class="isDark && 'translate-x-full'"
          >
            <SunIcon
              class="w-4 h-4 text-neutral-200"
              :class="isDark && 'hidden'"
            />
            <MoonIcon
              class="w-4 h-4 dark:text-neutral-900"
              :class="!isDark && 'hidden'"
            />
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
