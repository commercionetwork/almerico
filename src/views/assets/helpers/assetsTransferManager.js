import { CONTRACT } from '@/constants';
import { bech32Manager, msgBuilder, tokensHandler } from '@/utils';

const assetsTransferManager = {
  getMsg({ amount, chain, connection, isDeposit, token, wallet }) {
    const sourcePort = !isDeposit
      ? connection['channel']['port_id']
      : connection['channel']['counterparty']['port_id'];
    const sourceChannel = !isDeposit
      ? connection['channel']['channel_id']
      : connection['channel']['counterparty']['channel_id'];
    const uamount = tokensHandler.convertToBase(amount, token.decimals);
    const denom =
      token.type === CONTRACT.TOKEN.TYPE.NATIVE
        ? token.id
        : tokensHandler.buildIBCDenom({
            channelId: sourceChannel,
            portId: sourcePort,
            token,
          });
    const receiver = !isDeposit
      ? bech32Manager.encode(bech32Manager.decode(wallet), chain.hrp)
      : wallet;
    const sender = isDeposit
      ? bech32Manager.encode(bech32Manager.decode(wallet), chain.hrp)
      : wallet;
    const latestHeight = connection.client.client_state.latest_height;
    const timeoutTimestamp = Date.now() + 10 * 60 * 1000;
    return msgBuilder.buildMsgTransfer({
      receiver,
      sender,
      sourceChannel,
      sourcePort,
      timeoutHeight: {
        revisionNumber: latestHeight.revision_number,
        revisionHeight: latestHeight.revision_height,
      },
      timeoutTimestamp,
      token: {
        amount: uamount,
        denom,
      },
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
