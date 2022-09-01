import { withLayoutDefault } from "@/router/helper/layoutHelper";

const title = "Home";

export default withLayoutDefault({
  path: "/",
  name: title,
  component: () => import("@/views/home/HomeView.vue"),
  meta: {
    title,
  },
});
