import { useAppStoreWithOut } from "@/store/modules/app";
import { Router } from "vue-router";

// Used to handle page loading status
export function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut();
  router.beforeEach(async (to, from) => {
    console.log("setPageLoading to", to, "from", from);

    if (to.meta.loaded) {
      return true;
    }
    await appStore.setPageLoadingAction(true);

    return true;
  });

  router.afterEach(async () => {
    setTimeout(() => {
      appStore.setPageLoading(false);
    }, 400);
    return true;
  });
}
