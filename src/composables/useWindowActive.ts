import type { Ref } from "vue";
import { ref } from "vue";
import type { ConfigurableWindow, ConfigurableDocument } from "@vueuse/core";
import { defaultWindow, useEventListener, defaultDocument } from "@vueuse/core";

/**
 * Reactively track window activeness with `window.onfocus` and `window.onblur`.
 *
 * @see https://vueuse.org/useWindowFocus
 * @param options
 */
export function useWindowActive(
  { window = defaultWindow }: ConfigurableWindow = {},
  { document = defaultDocument }: ConfigurableDocument = {}
): Ref<boolean> {
  if (!window) return ref(false);
  if (!document) return ref(false);

  const active = ref<boolean>(!document.hidden);

  useEventListener(window, "visibilitychange", () => {
    if (document.hidden) {
      active.value = false;
    } else {
      active.value = true;
    }
  });

  return active;
}
