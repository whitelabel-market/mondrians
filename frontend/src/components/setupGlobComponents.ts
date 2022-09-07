import type { App } from "vue";
import Notifications from "notiwind";

export function setupGlobComponents(app: App) {
  app.use(Notifications);
}
