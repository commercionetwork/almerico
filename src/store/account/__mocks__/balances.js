import randomDataGenerator from "Store/__mocks__/utils";

const mockBalance = (denom = "ucommercio", i = null) => {
  const item = {
    denom: i ? `${denom} ${i}` : denom,
    amount: randomDataGenerator.intFromInterval(1000000000, 9999999999)
  };
  return item;
};

const mockBalances = (balances = 1, denom) => {
  let counter = 1;
  const list = new Array(balances).fill(null).map(() => {
    return balances > 1 ? mockBalance(denom, counter++) : mockBalance(denom);
  });
  return list;
};

export {
  mockBalance,
  mockBalances
};
