<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div
      class="font-bold md:text-[4.406rem] text-5xl italic relative z-10 lgs:text-left text-center"
    >
      Mondrian`s
      <span
        class="text-yellowish font-normal tracking-[0.2em] font-serif absolute lgs:left-0 left-1/2 lgs:translate-x-0 -translate-x-1/2 top-0 -z-10"
        >Mondrian’s</span
      >
    </div>
    <p
      class="md:text-xl text-base font-bold md:mt-4 mt-2 md:pl-6 mdx:px-[1.813rem] text-center"
    >
      A {{ maxSupply.toString() }} piece custom collection is joining the NFT
      Space.
    </p>
    <div
      class="font-semibold bg-yellowish mx-auto text-center md:py-1.5 pt-2 pb-[0.625rem] md:w-[10.5rem] w-[13.313rem] md:text-sm text-lg rounded-lg md:mt-11 mt-6 cursor-pointer"
    >
      View on WLM
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    maxSupply: {
      type: Number,
      required: true,
    },
  },
});
</script>
