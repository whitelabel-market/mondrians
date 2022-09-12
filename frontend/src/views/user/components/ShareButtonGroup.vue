<template>
  <MamoButton
    v-for="(item, index) in items"
    :key="index"
    @click="shareItem(item.content)"
    :tooltip="item.tooltip"
    only-icon
    size="xs"
    rounded="full"
  >
    <component :is="components[item.icon]" class="w-4 h-4" />
  </MamoButton>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { MamoButton } from "@/components/Button";
import CONFIG from "../../../../../config";
import { useMediaQuery } from "@vueuse/core";
import { FacebookIcon, TwitterIcon } from "@/components/Icon";
import { MailIcon, PlusIcon } from "@heroicons/vue/solid";

const components = { FacebookIcon, TwitterIcon, PlusIcon, MailIcon };

const props = defineProps(["isCurrent", "isMetaMask", "address"]);

const text = `Look at ${
  props.isCurrent ? "my" : "this"
} super rare Magic Mondrian collectibles. Don't miss getting one to receive some unique vouchers!`;

const items = reactive([
  {
    tooltip: "Share on facebook",
    icon: "FacebookIcon",
    content: {
      baseUrl: "https://www.facebook.com/sharer/sharer.php?",
      queryParams: {
        u: `${CONFIG.hostUrl}user/${props.address}/collected`,
        quote: text,
      },
    },
  },
  {
    tooltip: "Share on Twitter",
    icon: "TwitterIcon",
    content: {
      baseUrl: "https://twitter.com/intent/tweet?",
      queryParams: {
        url: `${CONFIG.hostUrl}user/${props.address}/collected`,
        text,
        hashtags: "ethereum,polygon,nonfungible,digitalasset,nft",
        via: "Magic Mondrian",
      },
    },
  },
  {
    tooltip: "Share via mail",
    icon: "MailIcon",
    content: {
      baseUrl: "mailto:?",
      queryParams: {
        subject: "Look at this collection!",
        body: text + `\n\n${CONFIG.hostUrl}user/${props.address}/collected`,
      },
    },
  },
]);

// detect mobile devices
const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

onMounted(() => {
  if (canHover.value && props.isMetaMask) {
    items.push({
      tooltip: "Add to wallet",
      icon: "PlusIcon",
    } as any);
  }
});

type ShareContent = {
  baseUrl: string;
  queryParams: Record<string, string>;
};

const shareItem = (content?: ShareContent): void => {
  if (!content) {
    addToken();
  } else {
    const { baseUrl, queryParams } = content;
    const link =
      baseUrl +
      Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join("&");
    window.open(link, "_blank");
  }
};

const addToken = async () => {
  const tokenAddress = CONFIG.contract;
  const tokenSymbol = CONFIG.tokenSymbol;
  const tokenDecimals = 0;
  const tokenImage = CONFIG.tokenImageForMetamaskWallet;

  try {
    const wasAdded = await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
