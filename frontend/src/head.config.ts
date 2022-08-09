import { type HeadObjectPlain } from "@vueuse/head";
import { MaybeRef } from "@vueuse/core";

const config = {
  title: "Magic Mondrian",
  description:
    "Mondrians is a drop of custom digital paintings, created by Piet Mondrian, aiming to express culture, uniqueness and creativity. Through size, shape and color Mondrian's embraces what it means to be on the common ground but having a sense of uniqueness.",
  image: {
    src: "https://magic-mondrian.art/mamo.png",
    width: 1200,
    height: 627,
  },
  type: "website",
  color: "#171717",
};

export default {
  titleTemplate: `${config.title} — %s`,
  meta: [
    {
      name: "description",
      content: config.description,
    },
    { name: "theme-color", content: config.color },
    {
      property: "og:description",
      content: config.description,
    },
    {
      property: "og:type",
      content: config.type,
    },
    {
      property: "og:image",
      content: config.image.src,
    },
    {
      property: "og:image:width",
      content: config.image.width,
    },
    {
      property: "og:image:height",
      content: config.image.height,
    },
  ],
} as MaybeRef<HeadObjectPlain>;
