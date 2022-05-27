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
    path: "/user/:id",
    name: "UserProfile",
    component: () => import("@/views/UserProfileView.vue"),
    children: [
      {
        path: "",
        redirect: { name: "CollectedItems" },
      },
      {
        path: "collected",
        name: "CollectedItems",
        component: () => import("@/views/UserProfileViewCollected.vue"),
        meta: {
          title: "Collected Items",
        },
      },
      {
        path: "activity",
        name: "Activity",
        component: () => import("@/views/UserProfileViewActivity.vue"),
        meta: {
          title: "Activity",
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
