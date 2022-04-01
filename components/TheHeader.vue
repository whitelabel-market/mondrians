<template>
  <nav class="container flex items-center md:justify-around justify-between mdx:pl-[2.188rem] mdx:pr-[1.625rem] mx-auto pt-6 pb-3">
    <img src="~/assets/images/Logo.png" alt="logo" class="md:w-[130px] w-[115px]">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="md:hidden"
    >
      <path
        d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
        fill="black"
      />
    </svg>
    <div class="mdx:fixed mdx:hidden mdx:right-0 mdx:top-0 mdx:w-full mdx:bg-white">
      <ul class="font-semibold md:flex items-center text-sm">
        <li><a href="#About">About</a></li>
        <li class="md:ml-5">
          <a href="#Roadmap">Roadmap</a>
        </li>
        <li class="md:ml-5">
          <a href="#Rarity">Rarity</a>
        </li>
        <li class="md:ml-10">
          <a href="#"><img src="../assets/images/images/discord.png" alt="discord" width="20px"></a>
        </li>
        <li class="md:ml-3">
          <a href="#"><img src="../assets/images/images/twitter.png" alt="twitter" width="20px"></a>
        </li>
        <li class="md:ml-4">
          <div class="bg-reddish text-white rounded-lg px-5 py-2 cursor-pointer">
            View on OpenSea
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
