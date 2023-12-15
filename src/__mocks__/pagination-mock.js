export const mockPagination = (next_key = null, total = '1') => {
  const item = {
    next_key,
    total,
  };
  return item;
};
