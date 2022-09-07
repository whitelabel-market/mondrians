import { defineStore } from "pinia";
import { store } from "@/store";

interface AppState {
  // show mobile menu
  showMobileMenu: boolean;
  // Page loading status
  pageLoading: boolean;
}
let timeId: TimeoutHandle;

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    pageLoading: false,
    showMobileMenu: false,
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getShowMobileMenu(): boolean {
      return this.showMobileMenu;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setShowMobileMenu(show: boolean): void {
      this.showMobileMenu = show;
    },
    async resetAllState() {
      console.log("resetAllState");
    },
    toggleMobileMenu() {
      this.setShowMobileMenu(!this.showMobileMenu);
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
