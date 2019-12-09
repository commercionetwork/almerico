const mockPool = (not_bonded_tokens = "10000000000000", bonded_tokens = "100000000000") => {
  let item = {
    not_bonded_tokens,
    bonded_tokens
  }
  return item;
};

export {
  mockPool
};
