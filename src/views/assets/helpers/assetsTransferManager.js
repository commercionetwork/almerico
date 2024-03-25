import { CONTRACT } from '@/constants';
import { bech32Manager, tokensHandler } from '@/utils';

const assetsTransferManager = {
  getAmount(amount, token) {
    return tokensHandler.convertToBase(amount, token.decimals);
  },
  getChannel(connection, isDeposit) {
    return isDeposit
      ? connection['channel']['counterparty']
      : connection['channel'];
  },
  getDenom(channel, token) {
    const isNativeToken = token.type === CONTRACT.TOKEN.TYPE.NATIVE;
    return isNativeToken ? token.id : convertTokenToIBC(channel, token);
  },
  getReceiver({ wallet, hrp, isDeposit }) {
    return isDeposit ? wallet : convertAccountToIBC(wallet, hrp);
  },
  getSender({ wallet, hrp, isDeposit }) {
    return isDeposit ? convertAccountToIBC(wallet, hrp) : wallet;
  },
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance({ amount, balance }) {
    return parseFloat(amount) <= parseFloat(balance);
  },
};

export default assetsTransferManager;

const convertAccountToIBC = (account, hrp) => {
  return bech32Manager.encode(bech32Manager.decode(account), hrp);
};

const convertTokenToIBC = (channel, token) => {
  return tokensHandler.buildIBCDenom({
    channelId: channel.channel_id,
    portId: channel.port_id,
    token,
  });
};
