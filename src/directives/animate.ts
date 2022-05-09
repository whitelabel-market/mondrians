import { Directive } from "vue";
import { gsap } from "gsap";

const from = { y: 50, autoAlpha: 0 };
const duration = 1;

export default {
  mounted(el, binding, vnode) {
    const els = binding?.value || el;

    gsap.from(els, {
      ...from,
      stagger: {
        amount: duration,
      },
      scrollTrigger: {
        trigger: el,
        once: true, // equals toggleActions: "play none none none",
        // toggleActions: "restart reset restart reset",
      },
      duration,
      ease: "power2.inOut",
    });
  },
} as Directive;
