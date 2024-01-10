import { CONTRACT, TRANSACTIONS } from '@/constants';
import { msgBuilder, tokensHandler } from '@/utils';

const dexSwapManager = {
  buildSwapMsg({ sender, contract, data }) {
    const inputToken =
      data.tokenFrom.denom === contract.token1.denom
        ? CONTRACT.TOKEN.KEY.TOKEN_1
        : CONTRACT.TOKEN.KEY.TOKEN_2;
    const inputAmount = tokensHandler.convertToBase(data.amount, 6).toString();
    const minOutput = calcSwapAmount({
      amount: data.amount,
      tokenFrom: data.tokenFrom,
      tokenTo: data.tokenTo,
      lp: contract.lp,
    }).toString();
    const msg = JSON.stringify({
      [TRANSACTIONS.KEY.SWAP]: {
        input_token: inputToken,
        input_amount: inputAmount,
        min_output: minOutput,
      },
    });
    const funds = [{ denom: data.tokenFrom.denom, amount: inputAmount }];
    return msgBuilder.buildMsgExecuteContract({
      sender,
      contract: contract.id,
      msg,
      funds,
    });
  },
  getExpectedAmount({ amount, tokenFrom, tokenTo, lp }) {
    return calcSwapAmount({ amount, tokenFrom, tokenTo, lp });
  },
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance(amount, balance) {
    return tokensHandler.convertToBase(amount, 6) <= parseInt(balance);
  },
};

export default dexSwapManager;

const calcSwapAmount = ({ amount, tokenFrom, tokenTo, lp }) => {
  const feeReductionPercent =
    10000 -
    (parseFloat(lp.lpFeePercent) + parseFloat(lp.protocolFeePercent)) * 100;
  const amountToSwap = tokensHandler.convertToBase(amount, 6);
  const inputAmount = amountToSwap * feeReductionPercent;
  return Math.trunc(
    (inputAmount * parseInt(tokenTo.reserve)) /
      (parseInt(tokenFrom.reserve) * 10000 + inputAmount)
  );
};
