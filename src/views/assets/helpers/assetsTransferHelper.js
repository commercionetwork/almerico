import { CHAIN, CONTRACT } from '@/constants';
import { bech32Manager, tokensHandler } from '@/utils';

const assetsTransferHelper = {
  getChainDataToBroadcast(chain, isDeposit) {
    const chainInfo = CHAIN.INFO();
    return isDeposit
      ? {
          chainId: chain.id,
          hrp: chain.hrp,
          rpc: chain.rpc,
        }
      : {
          chainId: chainInfo.chainId,
          hrp: chainInfo.bech32Config.bech32PrefixAccAddr,
          rpc: chainInfo.rpc,
        };
  },
  getReceiver({ chain, isDeposit, wallet }) {
    return isDeposit ? wallet : convertAddressToCounterparty(wallet, chain.hrp);
  },
  getSender({ chain, isDeposit, wallet }) {
    return isDeposit ? convertAddressToCounterparty(wallet, chain.hrp) : wallet;
  },
  getSource(chain, isDeposit) {
    const channel = isDeposit
      ? chain['deposit']['counterparty']
      : chain['withdraw'];
    return {
      channelId: channel.channel_id,
      portId: channel.port_id,
    };
  },
  getTimeoutTimestamp() {
    return (Date.now() + 10 * 60) * 1000 * 1000;
  },
  getToken({ amount, chain, isDeposit, token }) {
    const uamount = convertAmountToBase(amount, token.decimals);
    const isNativeToken = token.type === CONTRACT.TOKEN.TYPE.NATIVE;
    const tokenId = isNativeToken ? token.id : `cw20/${token.id}`;
    const channel = chain['withdraw']['counterparty'];
    const denom = isDeposit ? convertTokenToIBC(channel, tokenId) : tokenId;
    return {
      amount: uamount,
      denom,
    };
  },
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance({ amount, balance }) {
    return parseFloat(amount) <= parseFloat(balance);
  },
};

export default assetsTransferHelper;

const convertAddressToCounterparty = (account, hrp) => {
  return bech32Manager.encode(bech32Manager.decode(account), hrp);
};

const convertAmountToBase = (amount, decimals) => {
  return tokensHandler.convertToBase(amount, decimals).toString();
};

const convertTokenToIBC = (channel, tokenId) => {
  return tokensHandler.buildIBCDenom({
    channelId: channel.channel_id,
    portId: channel.port_id,
    token: { id: tokenId },
  });
};
