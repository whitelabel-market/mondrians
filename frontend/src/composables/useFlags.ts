import { ref, onMounted, reactive, toRefs, inject, watch } from "vue";
import type { Ref } from "vue";
import { UnleashClient } from "unleash-proxy-client";
import CONFIG from "../../../config";
import { useWindowActive } from "@/composables/useWindowActive";

export const TOGGLE_CONTEXT = Symbol();

export interface ToggleInterface {
  isEnabled: Ref<(name: string) => boolean | undefined>;
  client: Ref<UnleashClient>;
  flagsReady: Ref<boolean>;
  flagsError: Ref<null | any>;
}

export interface FlagStatus {
  flagsReady: Ref<boolean>;
  flagsError: Ref<null | any>;
}

export function createToggles(unleashClient?: UnleashClient): ToggleInterface {
  const client = ref<UnleashClient | undefined>(unleashClient);
  const flagsReady = ref<boolean>(false);
  const flagsError = ref<null | any>(null);
  const active = useWindowActive();

  client.value = new UnleashClient({
    url: CONFIG.unleash.url,
    clientKey: CONFIG.unleash.clientKey,
    appName: "mondrians",
    environment: "production",
    disableMetrics: true,
  });

  client.value?.on("ready", (): void => {
    flagsReady.value = true;
  });
  client.value?.on("error", (e: any): void => {
    flagsError.value = e;
  });

  onMounted(() => {
    watch(
      active,
      (isActive) => {
        if (isActive) {
          client.value?.start();
        } else {
          client.value?.stop();
        }
      },
      { immediate: true }
    );
  });

  const isEnabled = (name: string) => client.value?.isEnabled(name);

  const context = reactive({
    isEnabled,
    client,
    flagsReady,
    flagsError,
  });

  return toRefs(context) as ToggleInterface;
}

export function useFlag(name: string): Ref<boolean> {
  const { isEnabled, client } = inject(TOGGLE_CONTEXT) || {};
  const flag = ref<boolean>(!!isEnabled.value(name));

  client.value.on("update", () => {
    const enabled: boolean = isEnabled.value(name);
    if (enabled !== flag.value) {
      flag.value = !!enabled;
    }
  });

  client.value.on("ready", () => {
    flag.value = isEnabled.value(name);
  });

  return flag;
}

export function useFlagsStatus(): FlagStatus {
  const { flagsReady, flagsError } =
    (inject(TOGGLE_CONTEXT) as ToggleInterface) || {};
  return { flagsReady, flagsError };
}

export function useUnleashClient(): UnleashClient {
  const { client } = (inject(TOGGLE_CONTEXT) as ToggleInterface) || {};
  return client.value as UnleashClient;
}
