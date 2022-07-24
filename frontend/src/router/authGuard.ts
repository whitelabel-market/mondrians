import { NavigationGuard } from "vue-router";

export default (function authGuard(to, from, next) {
  next();
} as NavigationGuard);
