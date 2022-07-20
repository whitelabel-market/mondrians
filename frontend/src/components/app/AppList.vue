<template>
  <Listbox
    as="div"
    v-model="selected"
    @update:modelValue="$emit('selected', selected)"
  >
    <div class="relative mt-1">
      <ListboxButton
        :id="id"
        class="flex items-center justify-start w-full h-12 px-4 text-current transition-colors bg-white border-2 rounded outline-none focus:ring-0 dark:focus:border-stone-700 border-stone-700 dark:bg-neutral-900 ease-in-circ"
        ><span
          class="block truncate"
          :class="selected ? '' : 'dark:text-neutral-400 dark:bg-neutral-900'"
          >{{ selected?.name || placeholder }}</span
        >
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
          /> </span
      ></ListboxButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white border-2 rounded-md shadow-lg border-stone-700 dark:bg-neutral-900 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.name"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'dark:bg-stone-700' : 'dark:text-neutral-200',
                'relative cursor-pointer select-none py-2 px-4 pr-4 flex items-center justify-between',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ item.name }}</span
              >
              <span
                v-if="selected"
                class="flex items-center pl-3 text-dodgerblue"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

defineProps({
  items: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const selected = ref();
</script>
