import { useAppStoreWithOut } from "@/store/modules/app";
import { Router } from "vue-router";
import { promiseTimeout } from "@vueuse/core";

// Used to handle mobile menu when switching routes
export function createMobileMenuGuard(router: Router) {
  const appStore = useAppStoreWithOut();
  router.beforeEach(async (to, from) => {
    await promiseTimeout(50);
    appStore.setShowMobileMenu(false);
    return true;
  });

  router.afterEach(async () => {
    appStore.setShowMobileMenu(false);
    return true;
  });
}
