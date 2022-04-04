import WalletConnect from '@walletconnect/web3-provider'
import { ProviderType, type IProvider, ConnectorOptions } from '../../types'
import { WalletConnectLogo } from '../logos'

type WalletConnectOptionsType = {
    infuraId: string;
    bridge: string;
    qrcode: boolean;
    rpc: string;
    chainId: number;
    qrcodeModalOptions?: object;
}

const ConnectToWalletConnect = (options: ConnectorOptions) => {
  return new Promise((resolve, reject) => {
    const provider = new WalletConnect(
      {
        bridge: options.walletconnect?.bridge,
        qrcode: options.walletconnect?.qrcode,
        infuraId: options.infuraId,
        rpc: options.rpcUri,
        chainId: options.chainId,
        qrcodeModalOptions: options.walletconnect?.qrcodeModalOptions
      }
    )
    try {
      resolve(provider.enable())
    } catch (e) {
      reject(e)
    }
  })
}

const WALLETCONNECT: IProvider = {
  id: 'walletconnect',
  name: 'WalletConnect',
  logo: WalletConnectLogo,
  type: ProviderType.QRCODE,
  connect: ConnectToWalletConnect
}

export default WALLETCONNECT
