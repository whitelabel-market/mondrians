import type { Ref } from "vue";
import { ref } from "vue";
import type { ConfigurableWindow, ConfigurableDocument } from "@vueuse/core";
import { defaultWindow, useEventListener, defaultDocument } from "@vueuse/core";

/**
 * Reactively track window activeness with `visibilitychange` event listener.
 * Alternative to useWindowFocus which only tracks if window is focused.
 *
 * @see https://vueuse.org/useWindowFocus
 */
export function useWindowActive(
  fallback = true,
  { window = defaultWindow }: ConfigurableWindow = {},
  { document = defaultDocument }: ConfigurableDocument = {}
): Ref<boolean> {
  if (!window) return ref(fallback);
  if (!document) return ref(fallback);

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
