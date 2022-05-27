import { RouterScrollBehavior } from "vue-router";

export default (function (to) {
  if (to.hash) {
    return { el: to.hash, behavior: "smooth" };
  } else {
    return { x: 0, y: 0 };
  }
} as RouterScrollBehavior);
