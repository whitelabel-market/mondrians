<template>
  <div
    class="fixed top-0 left-0 hidden w-full h-screen pointer-events-none md:block"
  >
    <div class="absolute inset-0 mondrian-border"></div>
    <ul class="absolute right-0 text-white pointer-events-auto top-24">
      <li>
        <a href="#" class="block p-4 bg-black">
          <DiscordIcon class="w-5 h-5"
        /></a>
      </li>
      <li>
        <a class="block p-4 bg-black" href="#">
          <TwitterIcon class="w-5 h-5" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import DiscordIcon from "@/components/icons/DiscordIcon.vue";
</script>
