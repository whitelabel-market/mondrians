import { Directive } from "vue";
import { gsap } from "gsap";

const from = { autoAlpha: 0, y: 24 };
const duration = 0.6;

export default {
  mounted(el, binding) {
    const els = binding?.value || el;

    gsap.from(els, {
      ...from,
      stagger: {
        amount: duration,
      },
      scrollTrigger: {
        trigger: el,
        start: "center bottom",
      },
      duration,
      ease: "Sine.in",
    });
  },
} as Directive;
