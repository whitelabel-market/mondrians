import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import scrollBehavior from "@/router/scrollBehavior";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/mint",
    name: "Mint",
    component: () => import("@/views/MintView.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    component: () => import("@/views/UserView.vue"),
    children: [
      {
        path: "",
        redirect: { name: "CollectedItems" },
      },
      {
        path: "collected",
        name: "Collected",
        component: () => import("@/views/user/UserCollectedView.vue"),
        meta: {
          title: "Collected Items",
        },
      },
      {
        path: "activity",
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
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
