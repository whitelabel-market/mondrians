import { withLayoutBlank } from "@/router/helper/layoutHelper";

const title = "Screenshot";

export default withLayoutBlank({
  path: "/screenshot",
  name: title,
  component: () => import("@/views/screenshot/ScreenshotView.vue"),
  meta: {
    title,
  },
});
