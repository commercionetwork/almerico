import { CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

const tokensHandler = {
  buildIBCDenom({ channel, token }) {
    const name =
      token.type === CONTRACT.TOKEN.TYPE.NATIVE ? token.id : `cw20:${token.id}`;
    try {
      const seed = `${channel.port_id}/${channel.channel_id}/${name}`;
      const unhashedIbc = stringEncoder.encodeToSha256(seed);
      return 'ibc/' + unhashedIbc.toUpperCase();
    } catch (error) {
      return null;
    }
  },
  convertFromBase(amount, decimals) {
    return parseInt(amount) / Math.pow(10, decimals);
  },
  convertToBase(amount, decimals) {
    return Math.round(parseFloat(amount) * Math.pow(10, decimals));
  },
  format(amount, decimals) {
    if (isNaN(parseFloat(amount)) || isNaN(parseFloat(decimals))) {
      return '';
    }
    return formatAmount(amount, decimals);
  },
};

export default tokensHandler;

const formatAmount = (amount, decimals = 0) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
