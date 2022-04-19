import { watch, ref, RendererElement, RendererNode, VNode } from "vue";

export enum Status {
  LOADING = "loading",
  LOADED = "loaded",
  FAILED = "failed",
}

export default function useImage(
  slot:
    | VNode<
        RendererNode,
        RendererElement,
        {
          [key: string]: any;
        }
      >[]
    | undefined
) {
  const img: HTMLImageElement | null = null;
  const loading = ref(false);
  const loaded = ref(false);
  const failed = ref(false);
  const status = ref("");

  const onChanged = (status: string) => {
    switch (status) {
      case Status.LOADED:
        loaded.value = true;
        break;
      case Status.FAILED:
        failed.value = true;
        destroyLoader(img);
        break;
    }
  };

  const createLoader = (img: HTMLImageElement, src: string) => {
    destroyLoader(img);
    img.onload = () => (status.value = Status.LOADED);
    img.onerror = () => (status.value = Status.FAILED);
    img.src = src;
  };

  const destroyLoader = (img: HTMLImageElement | null) => {
    if (img) {
      img.onload = null;
      img.onerror = null;
    }
    img = null;
  };

  watch(status, onChanged);

  if (slot) {
    const queue = [...slot];
    while (queue.length > 0) {
      const child = queue.shift();
      if (child) {
        if (
          child.type === "img" ||
          (child.props && child.props["data-src"] != null)
        ) {
          loading.value = true;
          const src = child.props?.src || child.props?.["data-src"];
          createLoader(new Image(), src);
          break;
        }
        if (child.children instanceof Array) {
          queue.push(
            ...(child.children as VNode<
              RendererNode,
              RendererElement,
              {
                [key: string]: any;
              }
            >[])
          );
        }
      }
    }
  } else {
    status.value = Status.FAILED;
  }

  return {
    loading,
    loaded,
    failed,
  };
}
