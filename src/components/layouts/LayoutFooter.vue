<template>
  <footer class="container max-w-4xl mx-auto w-full px-8 py-24">
    <div class="py-16 grid grid-cols-2 md:grid-cols-3 max-w-xl gap-4 md:gap-20">
      <!--
      <div class="md:col-span-2 space-y-2 flex flex-col w-full">
        <router-link :to="'/'" class="inline-block">
          <LogoIcon />
        </router-link>
        <p class="text-lg">
          A 1000 piece custom collection is joining the NFT Space on White Label
          Market
        </p>
      </div>
-->

      <div>
        <span class="block mb-8">Home</span>
        <ul class="space-y-4 text-sm">
          <li>
            <router-link to="/#About" class="link">About</router-link>
          </li>
          <li>
            <router-link to="/#Gallery" class="link">Gallery</router-link>
          </li>
          <li>
            <router-link to="/#Roadmap" class="link">Roadmap</router-link>
          </li>
          <li>
            <router-link to="/#Rarity" class="link">Rarity</router-link>
          </li>
          <li>
            <router-link to="/#Creator" class="link">Creator</router-link>
          </li>
          <li><router-link to="/#Faq" class="link">Faq</router-link></li>
        </ul>
      </div>

      <div>
        <span class="block mb-8">Follow Us</span>
        <ul class="space-y-4 text-sm">
          <li>
            <router-link to="/#" class="link">Discord</router-link>
          </li>
          <li>
            <router-link to="/#" class="link">Twitter</router-link>
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
<script></script>
