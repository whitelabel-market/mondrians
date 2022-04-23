<template>
  <div
    class="container flex flex-col items-center justify-start flex-1 w-full h-full max-w-6xl pt-10 mx-auto gap-y-6"
  >
    <img
      :src="blockie"
      class="object-cover w-24 h-24 border-4 border-gray-200 rounded-full"
    />
    <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
      <EthereumIcon class="w-2" />
      <span class="text-xs font-medium slashed-zero">{{ privateAddress }}</span>
    </div>
    <nav
      class="flex justify-center w-full mx-auto space-x-10 border-b-2 border-gray-100"
    >
      <router-link
        v-for="title in tabs"
        :key="title"
        :to="title.toLowerCase()"
        v-slot="{ isExactActive }"
      >
        <div
          :class="[
            'relative flex items-center',
            title === 'certified' &&
              (user.role !== 'certifier' ||
                user.address !== route.params.address) &&
              'cursor-not-allowed',
          ]"
        >
          <div
            class="pt-4 pb-2 font-semibold capitalize transition duration-150 ease-in-out hover:text-blueish"
            :class="isExactActive ? 'text-blueish' : 'text-gray-300'"
          >
            {{ title }}
          </div>
          <span
            aria-hidden="true"
            class="absolute w-full h-0.5 -bottom-0.5 left-0 transition duration-150 ease-in-out"
            :class="isExactActive ? 'bg-blueish' : 'bg-transparent'"
          ></span>
        </div>
      </router-link>
    </nav>
    <div class="w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import EthereumIcon from "@/components/icons/EthereumIcon.vue";
import { useWallet } from "@/composables/useWallet";
const { blockie, privateAddress } = useWallet();
const tabs = ["Collected", "Activity"];
</script>
