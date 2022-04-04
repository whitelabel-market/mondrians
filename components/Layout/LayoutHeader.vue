<template>
  <header>
    <nav
      class="container flex items-center md:justify-around justify-between mdx:pl-[2.188rem] mdx:pr-[1.625rem] mx-auto pt-6 pb-3"
    >
      <img
        src="~/assets/images/Logo.png"
        alt="logo"
        class="md:w-[130px] w-[115px]"
      >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="md:hidden menu-burger"
      >
        <path
          d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
          fill="black"
        />
      </svg>
      <div
        class="md:hidden bg-white fixed top-0 right-[-16rem] z-50 w-[15.75rem] h-full pr-[1.625rem] transition-right duration-300 ease-in-out modal"
      >
        <ul
          class="font-bold leading-[2.813rem] text-[1.563rem] flex flex-col items-end"
        >
          <li class="mt-[1.449rem] cursor-pointer">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="close-button"
            >
              <path
                d="M0.376115 0.532348C0.617015 0.317436 0.9437 0.196705 1.28433 0.196705C1.62496 0.196705 1.95165 0.317436 2.19255 0.532348L8.99197 6.60012L15.7914 0.532348C15.9099 0.422857 16.0516 0.335524 16.2084 0.275444C16.3651 0.215363 16.5337 0.183739 16.7042 0.182416C16.8748 0.181094 17.044 0.210099 17.2018 0.26774C17.3597 0.325381 17.5031 0.410502 17.6237 0.518139C17.7444 0.625775 17.8397 0.75377 17.9043 0.894656C17.9689 1.03554 18.0014 1.1865 18 1.33871C17.9985 1.49093 17.963 1.64135 17.8957 1.78122C17.8284 1.92108 17.7305 2.04757 17.6078 2.15332L10.8084 8.22109L17.6078 14.2889C17.8418 14.5051 17.9713 14.7946 17.9684 15.0952C17.9655 15.3958 17.8304 15.6833 17.5922 15.8959C17.354 16.1084 17.0318 16.229 16.695 16.2316C16.3582 16.2342 16.0337 16.1187 15.7914 15.9098L8.99197 9.84207L2.19255 15.9098C1.95027 16.1187 1.62577 16.2342 1.28895 16.2316C0.952135 16.229 0.62994 16.1084 0.391764 15.8959C0.153587 15.6833 0.0184867 15.3958 0.0155598 15.0952C0.0126329 14.7946 0.142114 14.5051 0.376115 14.2889L7.17554 8.22109L0.376115 2.15332C0.135289 1.93835 0 1.64681 0 1.34284C0 1.03886 0.135289 0.747325 0.376115 0.532348Z"
                fill="black"
              />
            </svg>
          </li>
          <li class="mt-[4.923rem]">
            <a href="#About">ABOUT</a>
          </li>
          <li class="mt-[0.625rem]">
            <a href="#Roadmap">ROADMAP</a>
          </li>
          <li class="mt-[0.625rem]">
            <a href="#Rarity">RARITY</a>
          </li>
          <li class="mt-4">
            <div
              class="bg-reddish text-white rounded-lg px-5 py-2 cursor-pointer text-[0.938rem] leading-[1.313rem] font-medium"
            >
              View on OpenSea
            </div>
          </li>
          <li class="mt-[1.688rem]">
            <div class="flex">
              <a href="#">
                <div
                  class="p-2 border-[#EBF3FD] border-[1px] rounded-lg cursor-pointer"
                >
                  <img src="~/assets/images/discord.png" width="21px">
                </div>
              </a>
              <a href="#" class="ml-4">
                <div
                  class="p-2 border-[#EBF3FD] border-[1px] rounded-lg cursor-pointer"
                >
                  <img src="~/assets/images/twitter.png" width="21px">
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <ul class="flex items-center text-sm font-semibold mdx:hidden">
        <li><a href="#About">About</a></li>
        <li class="md:ml-5">
          <a href="#Roadmap">Roadmap</a>
        </li>
        <li class="md:ml-5">
          <a href="#Rarity">Rarity</a>
        </li>
        <li class="md:ml-10">
          <a href="#"><img
            src="~/assets/images/discord.png"
            alt="discord"
            width="20px"
          ></a>
        </li>
        <li class="md:ml-3">
          <a href="#"><img
            src="~/assets/images/twitter.png"
            alt="twitter"
            width="20px"
          ></a>
        </li>
        <li class="md:ml-4">
          <button
            class="px-5 py-2 text-white rounded-lg cursor-pointer bg-reddish"
            @click.prevent="showConnectModal = true"
          >
            Connect Wallet
          </button>
        </li>
      </ul>
    </nav>

    <LayoutConnectModal v-model="showConnectModal" />
  </header>
</template>
<script setup lang="ts">

const showConnectModal = ref(false)

</script>
