import { tokensHandler } from '@/utils';

const assetsCW20Helper = {
  adapt(cw20) {
    const contract = { ...cw20 };
    contract.initial_balances[0]['amount'] = tokensHandler
      .convertToBase(cw20.initial_balances[0]['amount'], cw20.decimals)
      .toString();
    contract.mint.cap = cw20.mint.cap
      ? tokensHandler.convertToBase(cw20.mint.cap, cw20.decimals).toString()
      : '';
    return contract;
  },
};

export default assetsCW20Helper;
