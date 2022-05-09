import { Directive } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const from = { y: 100, autoAlpha: 0 };
const to = { y: 0, autoAlpha: 1 };

const anim = (el: any) =>
  gsap.fromTo(el, from, {
    ...to,
    stagger: {
      amount: 10,
    },
    ease: "power1.inOut",
  });

const hide = (el: any) => gsap.set(el, from);

export default {
  created(el, binding, vnode, prevVnode) {
    const els = binding?.value || el;
    hide(els);

    ScrollTrigger.create({
      trigger: el,
      onEnter: () => anim(els),
      onLeave: () => hide(els),
      onEnterBack: () => anim(els),
    });
  },
} as Directive;
