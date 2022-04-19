import { ethers } from "ethers";
import { CONTRACT_ADDRESS, INFURA_WSS, NETWORK_NAME } from "@/utils/constants";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

type CallbackFunction = () => void;

class EthereumInterface {
  private provider: ethers.providers.WebSocketProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.WebSocketProvider(
      INFURA_WSS,
      NETWORK_NAME
    );
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      magicMondrian.abi,
      this.provider
    );
  }

  public async subscribeToNewBlock(callback: CallbackFunction) {
    this.provider.on("block", () => {
      callback();
    });
  }

  public async subscribeToTransfer(callback: CallbackFunction) {
    this.contract.on("Transfer", () => {
      callback();
    });
  }
}

export default EthereumInterface;
