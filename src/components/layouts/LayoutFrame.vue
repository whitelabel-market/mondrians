<template>
  <div class="fixed h-screen w-full top-0 left-0 pointer-events-none">
    <div class="hidden md:block absolute inset-0 mondrian-border"></div>
    <ul class="absolute text-white top-24 right-0 pointer-events-auto">
      <li>
        <a href="#" class="block bg-black p-4">
          <DiscordIcon class="w-5 h-5"
        /></a>
      </li>
      <li>
        <a class="block bg-black p-4" href="#">
          <TwitterIcon class="w-5 h-5" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import TwitterIcon from "@/components/icons/TwitterIcon";
import DiscordIcon from "@/components/icons/DiscordIcon";
</script>

<style scoped></style>
