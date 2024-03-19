import { msgBuilder, tokensHandler } from '@/utils';

const assetsTransferManager = {
  buildTransferMsg() {},
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance({ amount, balance }) {
    return parseFloat(amount) <= parseFloat(balance);
  },
};

export default assetsTransferManager;
