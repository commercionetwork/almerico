import { CONTRACT, TRANSACTIONS } from '@/constants';
import { msgBuilder, tokensHandler } from '@/utils';

const dexSwapManager = {
  buildSwapMsg({ sender, contract, data, token1 }) {
    const inputToken =
      data.tokenFrom.denom === token1.denom
        ? CONTRACT.TOKEN.KEY.TOKEN_1
        : CONTRACT.TOKEN.KEY.TOKEN_2;
    const inputAmount = tokensHandler.convertToBase(data.amount, 6).toString();
    const minOutput = calcSwapAmount({
      amount: data.amount,
      tokenFrom: data.tokenFrom,
      tokenTo: data.tokenTo,
      fee: contract.fee,
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
      contract: contract.address,
      msg,
      funds,
    });
  },
  getExpectedAmount({ amount, tokenFrom, tokenTo, fee }) {
    return calcSwapAmount({ amount, tokenFrom, tokenTo, fee });
  },
  greaterThanZero(amount) {
    return !isNaN(amount) && Number(amount) > 0;
  },
  smallerThanBalance(amount, balance) {
    return tokensHandler.convertToBase(amount, 6) <= parseInt(balance);
  },
};

export default dexSwapManager;

const calcSwapAmount = ({ amount, tokenFrom, tokenTo, fee }) => {
  const feeReductionPercent =
    10000 -
    (parseFloat(fee.lp_fee_percent) + parseFloat(fee.protocol_fee_percent)) *
      100;
  const amountToSwap = tokensHandler.convertToBase(amount, 6);
  const inputAmount = amountToSwap * feeReductionPercent;
  return Math.trunc(
    (inputAmount * parseInt(tokenTo.reserve)) /
      (parseInt(tokenFrom.reserve) * 10000 + inputAmount)
  );
};
