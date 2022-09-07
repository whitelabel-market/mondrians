import { App, Directive } from "vue";
import { gsap } from "gsap";

const from = { autoAlpha: 0, xPercent: 0, y: 10 };
const duration = 0.6;

const mounted = (el: Element, binding: any) => {
  const els = (binding?.modifiers.stagger && el.children) || el;

  gsap.from(els, {
    ...from,
    stagger: {
      amount: duration,
    },
    scrollTrigger: {
      trigger: el,
      start: "center bottom-=240px",
    },
    duration,
    ease: "Power1.inOut",
    ...binding?.value,
  });
};

const animateDirective: Directive = {
  mounted,
};

export function setupAnimateDirective(app: App) {
  app.directive("animate", animateDirective);
}

export default animateDirective;
