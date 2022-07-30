<template>
  <Combobox
    as="div"
    v-model="selected"
    @update:modelValue="$emit('selected', selected)"
    name="country"
    nullable
    v-slot="{ open }"
  >
    <div class="relative mt-1">
      <ComboboxButton
        as="div"
        class="relative flex items-center justify-between text-current dark:text-neutral-200"
      >
        <ComboboxInput
          class="flex items-center justify-start w-full h-12 px-4 transition-colors bg-white border-2 rounded outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-current focus:ring-0 dark:focus:border-neutral-200 focus:border-neutral-800 dark:border-stone-700 dark:bg-neutral-900 ease-in-circ border-stone-200"
          @change="query = $event.target.value"
          :display-value="(item) => item?.name"
          placeholder="Country"
        />
        <div
          class="absolute right-0 flex items-center h-full mr-4 text-gray-400 cursor-pointer"
        >
          <SelectorIcon
            class="w-5 h-5 cursor-pointer text-neutral-400 dark:hover:text-neutral-200 hover:text-stone-700 hover"
            aria-hidden="true"
          />
        </div>
      </ComboboxButton>
      <transition
        enter-active-class="z-50 transition duration-100 ease-out"
        enter-from-class="z-50 transform scale-95 opacity-0"
        enter-to-class="z-50 transform scale-100 opacity-100"
        leave-active-class="z-50 transition duration-75 ease-out"
        leave-from-class="z-50 transform scale-100 opacity-100"
        leave-to-class="z-50 transform scale-95 opacity-0"
      >
        <div v-show="open" class="z-50">
          <ComboboxOptions
            static
            class="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white border-2 rounded-md shadow-lg border-stone-700 dark:border-stone-200 dark:bg-neutral-900 max-h-60 focus:outline-none sm:text-sm"
          >
            <div
              class="flex items-center px-4 py-2"
              v-if="filtered.length === 0 && query !== ''"
            >
              Nothing found.
            </div>
            <ComboboxOption
              static
              v-slot="{ active, selected }"
              v-for="item in filtered"
              :key="item.name"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active || selected
                    ? 'bg-stone-200 dark:bg-stone-700 dark:text-neutral-200'
                    : 'dark:text-neutral-200',
                  'relative cursor-pointer select-none py-2 px-4 pr-4 flex items-center justify-between',
                ]"
                @click.prevent="query = ''"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate ',
                  ]"
                  >{{ item.name }}</span
                >
                <span
                  v-if="selected"
                  class="flex items-center pl-3 text-green-500"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </transition>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useActiveElement } from "@vueuse/core";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const activeElement = useActiveElement();
watch(activeElement, (el) => {
  if (el?.id?.startsWith("headlessui-combobox")) {
    query.value = "Ger";
    query.value = "";
  }
});

const selected = ref();
const query = ref("");

const filtered = computed(() =>
  query.value === ""
    ? props.items
    : props.items.filter((item: any) => {
        return item.name.toLowerCase().startsWith(query.value.toLowerCase());
      })
);
</script>
