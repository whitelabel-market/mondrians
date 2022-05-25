<template>
  <footer class="container w-full max-w-4xl px-8 py-24 mx-auto">
    <div
      class="grid max-w-xl grid-cols-2 gap-4 py-16 transition-colors duration-300 md:grid-cols-3 md:gap-20 text-neutral-900 dark:text-neutral-200"
    >
      <div>
        <span class="block mb-8">Home</span>
        <ul class="space-y-4 text-sm">
          <li v-for="(to, name) in routes" :key="to">
            <router-link class="link" :to="to">{{ name }}</router-link>
          </li>
        </ul>
      </div>
      <div>
        <span class="block mb-8">Follow Us</span>
        <ul class="space-y-4 text-sm">
          <li v-for="(to, name) in follows" :key="to">
            <router-link class="link" :to="to">{{ name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flex items-center justify-between mdx:flex-col-reverse md:mt-[3.125rem] mt-[0.563rem]"
    >
      <p class="text-xs leading-relaxed text-stone-400">
        © {{ new Date().getFullYear() }} Whitelabel Solutions, Inc. Powered by
        Piet Mondrian.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const routes = {
  About: "/#About",
  Gallery: "/#Gallery",
  Roadmap: "/#Roadmap",
  Rarity: "/#Rarity",
  Creator: "/#Creator",
  Faq: "/#Faq",
};

const follows = {
  Discord: "/#",
  Twitter: "/#",
};
</script>
