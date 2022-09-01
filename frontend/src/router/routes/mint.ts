import { withLayoutDefault } from "@/router/helper/layoutHelper";

const title = "Mint";

export default withLayoutDefault({
  path: "/mint",
  name: title,
  component: () => import("@/views/mint/MintView.vue"),
  meta: {
    title,
  },
});
