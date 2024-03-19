import { msgBuilder, tokensHandler } from '@/utils';

const assetsTransferManager = {
  buildTransferMsg({ amount, channel, receiver, sender, token }) {
    const uamount = tokensHandler.convertToBase(amount, token.decimals);
    const denom = tokensHandler.buildIBCDenom({ channel, token });
    const currentTimestamp = Date.now();
    const timeoutTimestamp = currentTimestamp + 20000;
    return msgBuilder.buildMsgTransfer({
      sourcePort: channel.port_id,
      sourceChannel: channel.channel_id,
      token: `${uamount}${denom}`,
      sender,
      receiver,
      timeoutTimestamp,
    });
  },
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance({ amount, balance }) {
    return parseFloat(amount) <= parseFloat(balance);
  },
};

export default assetsTransferManager;
