<template>
  <div class="text-white bg-black bg-hero-pattern-charlie">
    <div class="container w-full max-w-4xl p-8 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
        <div>
          <ul class="flex items-center h-full text-xs">
            <li>Copyright © {{ new Date().getFullYear() }} Decentum</li>
          </ul>
        </div>
        <div>
          <ul class="flex items-center space-x-8">
            <li v-for="(to, name) in Legal" :key="to" class="flex items-center">
              <router-link class="text-xs link" :to="to">{{
                name
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoutes } from "@/utils/constants";

const { Legal } = getRoutes();
</script>
