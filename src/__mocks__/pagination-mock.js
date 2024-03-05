export const mockPagination = (next_key = '', total = '1') => {
  const item = {
    next_key,
    total,
  };
  return item;
};
