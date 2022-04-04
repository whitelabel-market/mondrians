<template>
  <!-- <section class="pt-12 pb-16 md:py-24">
    <div
      class="lgs:flex items-center max-w-[61rem] mx-auto relative lgs:-left-[2.625rem]"
    >
      <img
        src="~/assets/images/image-1.png"
        alt=""
        class="mx-auto lgs:mx-0"
        width="560px"
      />
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
          class="mt-2.5 md:text-xl text-base font-bold md:mt-4 mt-2 md:pl-6 mdx:px-[1.813rem] text-center"
        >
          A 999 piece custom collection is joining the NFT Space.
        </p>
        <div
          class="font-semibold bg-yellowish mx-auto text-center md:py-1.5 pt-2 pb-[0.625rem] md:w-[10.5rem] w-[13.313rem] md:text-sm text-lg rounded-lg md:mt-11 mt-6 cursor-pointer"
        >
          View on WLM
        </div>
      </div>
    </div>
  </section> -->
  <section class="pt-12 pb-16 md:py-24">
    <div
      class="lgs:flex items-center max-w-[61rem] mx-auto relative lgs:-left-[2.625rem]"
    >
      <img
        src="~/assets/images/image-1.png"
        alt=""
        class="mx-auto lgs:mx-0"
        width="560px"
      />
      <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
        <div
          class="font-bold md:text-[4.406rem] text-5xl italic relative z-10 text-center"
        >
          Public Sale is live
          <span
            class="text-yellowish w-full font-normal tracking-[0.2em] lgs:tracking-[0.1em] text-center font-serif absolute lgs:left-0 left-1/2 lgs:translate-x-0 -translate-x-1/2 top-0 -z-10"
            >Public Sale is live</span
          >
        </div>
        <p class="mt-2 font-bold text-center md:text-3xl md:mt-4">10/10.000</p>
        <div class="flex items-center justify-center w-full mt-4 space-x-4">
          <button
            class="w-10 h-10 rounded-full bg-yellowish"
            @click.prevent="quantity === 0 ? (quantity = 0) : quantity--"
          >
            -
          </button>
          <input
            v-model="quantity"
            readonly
            type="text"
            name="mint"
            id="mint"
            class="block w-20 mx-auto text-center placeholder-gray-500 border-2 border-gray-700 rounded-full focus:outline-none"
            placeholder="1"
          />
          <button
            class="w-10 h-10 rounded-full bg-yellowish"
            @click.prevent="quantity++"
          >
            +
          </button>
        </div>
        <p
          class="flex items-center justify-center mt-4 space-x-2 text-sm font-semibold"
        >
          <span>Price: {{ price * quantity }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 32 32"
          >
            <g fill="none" fill-rule="evenodd">
              <circle cx="16" cy="16" r="16" fill="#627EEA" />
              <g fill="#FFF" fill-rule="nonzero">
                <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
                <path d="M16.498 4 9 16.22l7.498-3.35z" />
                <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
                <path d="M16.498 27.995v-6.028L9 17.616z" />
                <path
                  fill-opacity=".2"
                  d="m16.498 20.573 7.497-4.353-7.497-3.348z"
                />
                <path fill-opacity=".602" d="m9 16.22 7.498 4.353v-7.701z" />
              </g>
            </g>
          </svg>
        </p>
        <div class="flex items-center justify-center">
          <button
            class="font-semibold bg-yellowish px-8 text-center md:py-1.5 pt-2 pb-[0.625rem] text-lg rounded-xl mt-4"
            @click.prevent="mint()"
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { whitelistInterface } from "@/services";

export default defineComponent({
  setup() {
    const quantity = ref(1);
    const price = 0.01;
    let phases: any;

    const mint = async () => {
      try {
        switch (phases) {
          case "whitelist":
            const voucher = await whitelistInterface.getVoucher("abcd");
            if (voucher) {
              // WL MINT
            }
          case "public":
          // PB MINT
        }
      } catch (e) {
        throw new Error(e.toString());
      }
    };
    return { quantity, price, mint };
  },
});
</script>
