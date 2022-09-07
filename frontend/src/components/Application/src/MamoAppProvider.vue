<script lang="ts">
import { defineComponent, provide } from "vue";
import { createToggles, TOGGLE_CONTEXT } from "@/composables/useFlags";
import { createCurrency, CURRENCY_CONTEXT } from "@/composables/useCurrency";

export default defineComponent({
  inheritAttrs: false,
  setup(props, { slots }) {
    provide(TOGGLE_CONTEXT, createToggles());
    provide(CURRENCY_CONTEXT, createCurrency());

    return () => slots.default?.();
  },
});
</script>
