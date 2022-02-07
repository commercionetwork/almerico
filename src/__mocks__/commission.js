import { mockBalances } from '@/__mocks__';

export const mockCommission = (commission = 1) => {
  const item = {
    commission: mockBalances(commission),
  };
  return item;
};
