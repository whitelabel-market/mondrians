import WalletInterface from "@/services/WalletInterface";
import MondrianInterface from "@/services/MondrianInterface";

const mondrianInterface = new MondrianInterface();
const walletInterface = new WalletInterface();

export { mondrianInterface, walletInterface };
