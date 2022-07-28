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
      <div>
        <ComboboxInput
          class="flex items-center justify-start w-full h-12 px-4 text-current transition-colors bg-white border-2 rounded outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-current focus:ring-0 dark:focus:border-neutral-200 focus:border-neutral-800 dark:border-stone-700 dark:bg-neutral-900 ease-in-circ border-stone-200"
          placeholder="Countrys"
          :displayValue="(item) => item?.name"
          :onChange="(event) => (query.value = event.target.value)"
          :onFocus="
            (e) => {
              if (e.relatedTarget?.id?.includes('headlessui-combobox-button'))
                return;
              !open && e.target.nextSibling.click();
            }
          "
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <SelectorIcon
            class="w-5 h-5 text-neutral-400 dark:hover:text-neutral-200 hover:text-neutral-800"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>
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
                    ? 'bg-stone-200 dark:bg-stone-700'
                    : 'dark:text-neutral-200',
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
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </transition>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
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
