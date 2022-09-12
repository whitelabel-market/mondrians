import { withLayoutDefault } from "@/router/helper/layoutHelper";
import { PAGE_LOADING, PERMISSION_MODE } from "@/router/constants";

const title = "User";

export default withLayoutDefault({
  path: "/user/:id",
  component: () => import("@/views/user/UserView.vue"),
  redirect: { name: "Collected" },
  name: title,
  meta: {
    title,
    loading: PAGE_LOADING.Manual,
  },
  children: [
    {
      path: "collected",
      name: "Collected",
      component: () => import("@/views/user/UserCollectedView.vue"),
      meta: {
        title: "Collected Items",
      },
    },
    {
      path: "Activity",
      name: "Activity",
      component: () => import("@/views/user/UserActivityView.vue"),
      meta: {
        title: "Activity",
      },
    },
    {
      path: "event",
      name: "Event",
      component: () => import("@/views/user/UserEventView.vue"),
      meta: {
        title: "Event",
        [PERMISSION_MODE.Owner]: "id",
      },
    },
    {
      path: "print",
      name: "Print",
      component: () => import("@/views/user/UserPrintView.vue"),
      meta: {
        title: "Print",
        [PERMISSION_MODE.Owner]: "id",
      },
    },
  ],
});
