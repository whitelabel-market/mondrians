import { withLayoutDefault } from "@/router/helper/layoutHelper";
import { PAGE_LOADING } from "@/router/constants";

const title = "Home";

export default withLayoutDefault({
  path: "/",
  name: title,
  component: () => import("@/views/home/HomeView.vue"),
  meta: {
    title,
    loading: PAGE_LOADING.Manual,
  },
});
