<template>
  <div>
    <div class="h-24"></div>
    <header class="fixed top-0 left-0 bg-white w-full mondrian-border-b">
      <nav
        class="container flex items-center justify-between w-full max-w-6xl px-8 h-24 mx-auto"
      >
        <router-link :to="'/'" class="inline-block"> <LogoIcon /> </router-link>
        <MenuIcon class="md:hidden menu-burger" />
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
              <div
                @click.prevent="
                  gsap.to(window, { duration: 2, scrollTo: '#About' })
                "
              >
                ABOUT
              </div>
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
                    <img src="../../assets/images/discord.png" width="21px" />
                  </div>
                </a>
                <a href="#" class="ml-4">
                  <div
                    class="p-2 border-[#EBF3FD] border-[1px] rounded-lg cursor-pointer"
                  >
                    <TwitterIcon />
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <ul
          class="flex items-center text-sm font-semibold mdx:hidden md:space-x-5"
        >
          <li v-for="section in Object.values(Section)" :key="section">
            <a
              class="font-black uppercase text-xs"
              v-if="!route.path.startsWith('/user')"
              :href="`#${section}`"
              @click.prevent="scrollTo(`#${section}`)"
              >{{ section }}</a
            >
          </li>
          <li class="md:ml-4">
            <AppButton
              v-if="!isConnected || !blockie"
              size="sm"
              :color="!blockie ? 'reddish' : 'link'"
              :loading="loading"
              :class="loading || !blockie ? 'duration-0' : 'px-0'"
              @click.prevent="showConnectModal = true"
            >
              Connect Wallet
            </AppButton>

            <AppButton
              :loading="loading"
              v-else
              @click.prevent="showUserModal = true"
              color="link"
            >
              <img :src="blockie" class="object-cover w-6 h-6 rounded-full" />
              <span class="font-sans font-black text-xs slashed-zero">{{
                ensAccount?.name || privateAddress
              }}</span>
            </AppButton>
          </li>
        </ul>
      </nav>

      <LayoutConnectModal v-model="showConnectModal" />
      <UserModal
        v-model="showUserModal"
        :privateAddress="privateAddress"
        :blockie="blockie"
        :ensAccount="ensAccount"
      />
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutConnectModal from "@/components/wallet-connect/LayoutConnectModal.vue";
import UserModal from "@/components/user/UserModal.vue";
import { useWallet } from "@/composables/useWallet";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppImageLoad from "@/components/app/AppImageLoad.vue";
import AppButton from "@/components/app/AppButton.vue";
import { useRoute } from "vue-router";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import DiscordIcon from "@/components/icons/DiscordIcon.vue";

gsap.registerPlugin(ScrollToPlugin);

const { privateAddress, loading, blockie, isConnected, ensAccount } =
  useWallet();
const route = useRoute();
const showConnectModal = ref(false);
const showUserModal = ref(false);

enum Section {
  About = "About",
  Gallery = "Gallery",
  Roadmap = "Roadmap",
  Rarity = "Rarity",
  Creator = "Creator",
  Faq = "Faq",
}

const scrollTo = (el: string) => {
  gsap.to(window, {
    scrollTo: el,
    duration:
      0.5 +
      Object.values(Section)
        .map((section) => section.toLowerCase())
        .indexOf(el.slice(1).toLowerCase()) *
        0.2,
  });
  history.pushState({}, document.title, `/${el}`);
};
</script>
