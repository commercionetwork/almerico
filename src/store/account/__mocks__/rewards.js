import randomDataGenerator from '../../__mocks__/utils';

const mockReward = () => {
  const amount = randomDataGenerator.intFromInterval(1000000000, 9999999999);
  const item = {
    validator_address: 'did:com:valoper17mphsm779jkkha32dmfy0sm8563qz3mzsl43hv',
    reward: [
      {
        denom: 'ucommercio',
        amount: `${amount}.000000000000000000`,
      },
    ],
  };
  return { item: item, amount: amount };
};

const mockRewards = (rewards = 5) => {
  let total = 0;
  const list = new Array(rewards).fill(null).map(() => {
    const reward = mockReward();
    total += reward['amount'];
    return reward['item'];
  });
  return {
    list,
    total: [
      {
        denom: 'ucommercio',
        amount: `${total}.000000000000000000`,
      },
    ],
  };
};

export { mockReward, mockRewards };
