<template>
  <ShareButton
    v-for="(item, index) in items"
    :key="index"
    :item="item"
    :index="index"
    :hintVisible="hintVisible"
    @clicked="shareItem"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import ShareButton from "@/components/share/ShareButton.vue";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useMediaQuery } from "@vueuse/core";

const props = defineProps({
  address: {
    type: String,
    required: true,
  },
  hintVisible: {
    type: Boolean,
  },
});

const { address: self, provider } = useWallet();

const text = `Look at ${
  props.address === self.value ? "my" : "this"
} super rare Magic Mondrian collectibles. Don't miss getting one to receive some unique vouchers!`;

const items = reactive([
  {
    tooltip: "Share on facebook",
    icon: "FacebookIcon",
    content: {
      baseUrl: "https://www.facebook.com/sharer/sharer.php?",
      queryParams: {
        u: `https://magic-mondrian.netlify.app/user/${props.address}/collected`,
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
        url: `https://magic-mondrian.netlify.app/user/${props.address}/collected`,
        text,
        hashtags: "ethereum,polygon,nonfungible,digitalasset,nft",
        via: "whitelabelmarket",
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
        body:
          text +
          `\n\nhttps://magic-mondrian.netlify.app/user/${props.address}/collected`,
      },
    },
  },
]);

// detect mobile devices
const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

onMounted(() => {
  const isMetamask = provider.value?.isMetaMask;
  if (canHover.value && isMetamask) {
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

const shareItem = (content: ShareContent | undefined): void => {
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
  const tokenAddress = CONTRACT_ADDRESS;
  const tokenSymbol = "MAMO";
  const tokenDecimals = 0;
  const tokenImage =
    "https://ipfs.io/ipfs/bafybeid7fmhgs7roxyctc5k2ciut3wgznpnhtx2tawhl2pf47s7e554cim/1.png";

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
