import { useAppStoreWithOut } from "@/store/modules/app";
import { Router } from "vue-router";
import { promiseTimeout } from "@vueuse/core";
import { PAGE_LOADING } from "@/router/constants";

// Used to handle page loading status
export function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut();
  router.beforeEach(async (to, from) => {
    if (
      to.meta.loading !== PAGE_LOADING.Always &&
      to.matched.length > 0 &&
      from.matched.length > 0 &&
      to.matched[0] === from.matched[0]
    ) {
      return true;
    }
    if (to.meta.loading === PAGE_LOADING.Never) {
      return true;
    }
    await appStore.setPageLoadingAction(true);

    // prevent switching route before loader show animation ends
    await promiseTimeout(50);
    return true;
  });

  router.afterEach(async () => {
    // prevent flicker
    await promiseTimeout(400);
    appStore.setPageLoading(false);
    return true;
  });
}
