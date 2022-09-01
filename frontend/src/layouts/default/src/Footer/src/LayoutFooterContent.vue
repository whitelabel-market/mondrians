<template>
  <div
    class="container w-full max-w-4xl px-8 py-24 mx-auto space-y-24 duration-200 text-neutral-800 dark:text-neutral-200"
  >
    <div class="grid grid-cols-2 gap-4 py-16 gap-y-16 md:grid-cols-4 md:gap-20">
      <div v-for="(items, title) in routes" :key="title">
        <span class="block mb-8">{{ title }}</span>
        <ul class="space-y-4 text-sm">
          <li v-for="(to, name) in items" :key="title + to">
            <router-link class="link" :to="to">{{ name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoutes } from "@/utils/constants";

const routes = getRoutes("0x23479a6877970e5889dfad779e225adc08eb8e03");
</script>
