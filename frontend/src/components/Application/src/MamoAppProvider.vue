<script lang="ts">
import { defineComponent, provide } from "vue";
import { createToggles, TOGGLE_CONTEXT } from "@/composables/useFlags";

export default defineComponent({
  inheritAttrs: false,
  setup(props, { slots }) {
    provide(TOGGLE_CONTEXT, createToggles());

    return () => slots.default?.();
  },
});
</script>
