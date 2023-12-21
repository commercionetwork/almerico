import { CONTRACT, TRANSACTIONS } from '@/constants';
import { msgBuilder, tokensHandler } from '@/utils';

const dexSwapManager = {
  buildIncreaseAllowanceMsg({ sender, contract, data }) {
    const msg = JSON.stringify({
      [TRANSACTIONS.KEY.INCREASE_ALLOWANCE]: {
        spender: data.spender,
        amount: tokensHandler
          .convertToBase(data.amount, data.decimals)
          .toString(),
      },
    });
    return msgBuilder.buildMsgExecuteContract({ sender, contract, msg });
  },
  buildSwapMsg({ sender, contract, data }) {
    const inputToken =
      data.tokenFrom.id === contract.token1.id
        ? CONTRACT.TOKEN.KEY.TOKEN_1
        : CONTRACT.TOKEN.KEY.TOKEN_2;
    const inputAmount = tokensHandler
      .convertToBase(data.amount, data.tokenFrom.decimals)
      .toString();
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
    const funds = setFunds(data.tokenFrom, inputAmount);
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
  smallerThanBalance(amount, tokenFrom) {
    return (
      tokensHandler.convertToBase(amount, tokenFrom.decimals) <=
      parseInt(tokenFrom.balance)
    );
  },
};

export default dexSwapManager;

const calcSwapAmount = ({ amount, tokenFrom, tokenTo, lp }) => {
  const feeReductionPercent =
    10000 -
    (parseFloat(lp.lpFeePercent) + parseFloat(lp.protocolFeePercent)) * 100;
  const amountToSwap = tokensHandler.convertToBase(amount, tokenFrom.decimals);
  const inputAmount = amountToSwap * feeReductionPercent;
  return Math.trunc(
    (inputAmount * parseInt(tokenTo.reserve)) /
      (parseInt(tokenFrom.reserve) * 10000 + inputAmount)
  );
};

const setFunds = (tokenFrom, amount) => {
  if (tokenFrom.type !== CONTRACT.TOKEN.TYPE.NATIVE) {
    return [];
  }
  return [{ denom: tokenFrom.id, amount }];
};
