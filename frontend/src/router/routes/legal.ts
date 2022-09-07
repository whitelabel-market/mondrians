import { withLayoutDefault } from "@/router/helper/layoutHelper";
import { PAGE_LOADING } from "@/router/constants";

const title = "Legal";

export default withLayoutDefault({
  path: "/legal",
  redirect: "/legal/terms-of-service",
  name: title,
  meta: {
    title,
  },
  children: [
    {
      path: "/legal/terms-of-service",
      name: "Terms Of Service",
      component: () => import("@/views/legal/TermsOfServiceView.vue"),
      meta: {
        title: "Terms Of Service",
        loading: PAGE_LOADING.Always,
      },
    },
    {
      path: "/legal/privacy-policy",
      name: "Privacy Policy",
      component: () => import("@/views/legal/PrivacyPolicyView.vue"),
      meta: {
        title: "Privacy Policy",
        loading: PAGE_LOADING.Always,
      },
    },
    {
      path: "/legal/return-policy",
      name: "Return Policy",
      component: () => import("@/views/legal/ReturnPolicyView.vue"),
      meta: {
        title: "Return Policy",
        loading: PAGE_LOADING.Always,
      },
    },
  ],
});
