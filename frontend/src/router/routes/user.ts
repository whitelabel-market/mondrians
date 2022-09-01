import { withLayoutDefault } from "@/router/helper/layoutHelper";

const title = "User";

export default withLayoutDefault({
  path: "/user/:id",
  component: () => import("@/views/user/UserView.vue"),
  redirect: { name: "Collected" },
  name: title,
  meta: {
    title,
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
      },
    },
    {
      path: "print",
      name: "Print",
      component: () => import("@/views/user/UserPrintView.vue"),
      meta: {
        title: "Print",
      },
    },
  ],
});
