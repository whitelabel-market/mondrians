<template>
  <div
    class="flex flex-col items-center mx-auto space-y-8 text-center transition-colors duration-200 flex-0 text-neutral-900 dark:text-neutral-200"
    v-if="error"
  >
    <h3 class="text-2xl font-bold">Something went wrong</h3>
    <div class="flex items-center">
      <span>
        Please
        <button class="link inline" @click="() => route.go(0)">
          Reload the page
        </button>
        or
        <router-link :to="`/`" class="link inline">
          go back to home
        </router-link>
      </span>
    </div>
  </div>
  <div
    class="flex flex-col items-center mx-auto space-y-8 text-center transition-colors duration-200 flex-0 text-neutral-900 dark:text-neutral-200"
    v-else
  >
    <div
      class="flex items-center justify-center w-10 h-10 p-2 transition-colors duration-200 bg-white rounded-full shadow-lg animate-bounce dark:bg-neutral-200 ring-1 ring-slate-900/5 dark:ring-slate-200/20"
    >
      <div class="w-5 h-5 text-neutral-900">
        <slot name="icon" :isCurrent="isCurrent">
          <ArrowSmUpIcon />
        </slot>
      </div>
    </div>
    <h3 class="text-2xl font-bold">
      <slot name="title" :isCurrent="isCurrent">No tokens found</slot>
    </h3>
    <div>
      <p>
        <slot name="description" :isCurrent="isCurrent">
          It seems like {{ isCurrent ? "you have" : "this address has" }} none
          of the rare Mondrians.
        </slot>
      </p>

      <p>
        You should consider to
        {{ isCurrent ? "create a Mondrian &#128640; and " : "" }} make some
        noise to promote the collection &#128172;
      </p>
    </div>
    <MamoButton :to="`/mint`" v-if="isCurrent" color="candlelight">
      Create Mondrian
    </MamoButton>
  </div>
</template>

<script setup lang="ts">
import { ArrowSmUpIcon } from "@heroicons/vue/solid";
import { MamoButton } from "@/components/Button";
import { useRouter } from "vue-router";

defineProps(["isCurrent", "error"]);

const route = useRouter();
</script>
