<template>
  <footer
    class="max-w-6xl mx-auto w-full text-center sm:text-left md:pt-[4.438rem] md:pb-[3.125rem] py-[2.25rem]"
  >
    <div>
      <div class="flex justify-between mdx:flex-col">
        <div class="md:max-w-[22.625rem]">
          <router-link :to="'/'" class="inline-block">
            <LogoIcon />
          </router-link>
          <p class="mt-4 text-base font-medium">
            A 1000 piece custom collection is joining the NFT Space on White
            Label Market
          </p>
        </div>
      </div>
      <div
        class="flex items-center justify-between mdx:flex-col-reverse md:mt-[3.125rem] mt-[0.563rem]"
      >
        <p
          class="text-[0.656rem] md:leading-5 leading-[0.844rem] font-medium mdx:mt-4 mdx:w-[9.938rem]"
        >
          Built with &#127829; by WhiteLabel Solutions. Powered by Piet
          Mondrian.
        </p>
        <div class="flex">
          <a href="#">
            <div
              class="p-2 border-[#EBF3FD] border-[1px] rounded-lg cursor-pointer"
            >
              <img src="../../assets/images/discord.png" width="17px" />
            </div>
          </a>
          <a href="#" class="ml-3">
            <div
              class="p-2 border-[#EBF3FD] border-[1px] rounded-lg cursor-pointer"
            >
              <img src="../../assets/images/twitter.png" width="18px" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import LogoIcon from "@/components/icons/LogoIcon";
export default {
  components: { LogoIcon },
};
</script>
