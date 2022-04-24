<template>
  <div class="absolute right-0">
    <Menu as="div">
      <div>
        <MenuButton
          class="p-2 rounded-full group hover:bg-gray-100 focus:outline-none"
        >
          <DotsHorizontalIcon
            class="w-5 h-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 flex-1 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-2 ring-gray-100 focus:outline-none"
        >
          <div class="w-full p-2 space-y-1">
            <MenuItem v-slot="{ active }">
              <a
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
                  'cursor-pointer group flex rounded-md w-full items-center px-2 py-2 text-sm font-medium',
                ]"
                :href="`https://ipfs.io/ipfs/${token.imageURI.replace(
                  'ipfs://',
                  ''
                )}`"
                target="_blank"
              >
                View on ipfs
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
                  'cursor-pointer group flex rounded-md w-full items-center px-2 py-2 text-sm font-medium',
                ]"
                :href="`https://testnets.opensea.io/assets/${token.contract.id}/${token.id}`"
                target="_blank"
              >
                View on opensea
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { DotsHorizontalIcon } from "@heroicons/vue/solid";

defineProps({
  token: {
    type: Object,
    required: true,
  },
});
</script>
