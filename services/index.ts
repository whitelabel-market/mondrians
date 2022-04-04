import AuthInterface from "./AuthInterface";
import WhitelistInterface from "./WhitelistInterface";

export const authInterface = new AuthInterface();
export const whitelistInterface = new WhitelistInterface();

export default { authInterface, whitelistInterface };
