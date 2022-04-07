// @ts-ignore
import ethProvider from "eth-provider";
import { ProviderType, type IProvider } from "../../types";
import { FrameLogo } from "../logos";

const ConnectToFrame = async () => {
  return ethProvider("frame");
};

const FRAME: IProvider = {
  id: "frame",
  name: "Frame",
  logo: FrameLogo,
  type: ProviderType.WEB,
  connect: ConnectToFrame,
};

export default FRAME;
