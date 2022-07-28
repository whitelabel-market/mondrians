import { Directive } from "vue";
import { gsap } from "gsap";

const from = { autoAlpha: 0, xPercent: 0, y: 10 };
const duration = 0.6;

export default {
  mounted(el, binding) {
    const els = (binding?.modifiers.stagger && el.children) || el;

    gsap.from(els, {
      ...from,
      stagger: {
        amount: duration,
      },
      scrollTrigger: {
        trigger: el,
        start: "center bottom",
      },
      overwrite: true,
      duration,
      ease: "Power1.inOut",
      ...binding?.value,
    });
  },
} as Directive;
