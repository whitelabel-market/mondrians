// import { defineStore } from "pinia";
// import { createWalletInterface } from "@/services/WalletInterface";
// import { ethers } from "ethers";
// import { ComputedRef } from "vue";
// import { computed } from "vue";

// export interface WalletState {
//   provider: ethers.providers.Web3Provider | null;
//   signer: ethers.Signer | null;
//   signMessage: (message: string) => Promise<string>;
//   address: string;
//   privateAddress: string;
// }

// export const useWalletStore = defineStore("wallet", {
//   state: (): WalletState => ({
//     provider: null,
//     signer: null,
//     signMessage: async (message: string) => await message,
//     address: "",
//     privateAddress: "",
//   }),
//   actions: {
//     async connect(provider: any) {
//       const wallet = await createWalletInterface(provider);
//       ({
//         provider: this.provider,
//         signer: this.signer,
//         signMessage: this.signMessage,
//         address: this.address,
//         privateAddress: this.privateAddress,
//       } = wallet);
//     },
//     async disconnect() {
//       console.error("disconnect not implemented");
//     },
//   },
//   getters: {
//     connected: ({ provider }): ComputedRef<boolean | null> =>
//       computed(() => provider != null),
//   },
// });
