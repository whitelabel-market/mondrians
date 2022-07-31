<template>
  <footer class="transition-colors duration-100 bg-white dark:bg-neutral-900">
    <div class="container w-full max-w-4xl px-8 py-24 mx-auto space-y-24">
      <div
        v-if="!presaleOpen"
        class="flex flex-col justify-center mx-auto space-y-8 transition-colors duration-100 dark:text-neutral-200"
        v-animate.stagger
      >
        <h2
          class="flex flex-col items-center text-3xl font-black text-center uppercase md:text-4xl"
        >
          Get your
          <LogoIcon class="!text-3xl md:!text-4xl" /> NFT now
        </h2>
        <div class="mx-auto">
          <AppButton color="crimson" to="/mint">Create your own</AppButton>
        </div>
      </div>
      <div
        class="grid grid-cols-2 gap-4 py-16 transition-colors duration-100 dark:text-neutral-200 gap-y-16 md:grid-cols-4 md:gap-20"
      >
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
    <div class="text-white bg-black bg-hero-pattern-charlie">
      <div class="container w-full max-w-4xl p-8 mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
          <div>
            <p class="text-xs">
              Copyright © {{ new Date().getFullYear() }} Decentum
            </p>
          </div>
          <div>
            <ul class="flex items-center space-x-8">
              <li v-for="(to, name) in Legal" :key="to">
                <router-link class="link text-xs" :to="to">{{
                  name
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import { useFlag } from "@/composables/useFlags";
import { SalePhase } from "@/utils/constants";

const presaleOpen = useFlag(SalePhase.PreSale);

const Home = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  Faq: "/#Faq",
};

const User = {
  "Collected Tokens":
    "/user/0x23479a6877970e5889dfad779e225adc08eb8e03/collected",
  Activity: "/user/0x23479a6877970e5889dfad779e225adc08eb8e03/activity",
};

const Mint = {
  Mint: "/mint",
};

const Legal = {
  "Terms of service": "/terms-of-service",
  "Return policy": "/return-policy",
  "Privacy policy": "/privacy-policy",
};

const routes = { Home, User, Mint, Legal };
</script>
