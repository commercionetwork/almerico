const mockWasmsBalance = () => {
  const item = {
    contract:
      'did:com:1evdkvfyvwuyzggjuzu7r6w0k0ukqrv78w40dygrxnucek48azdqsev3njp',
    balance: '100',
    name: 'name',
    decymals: 0,
    symbol: 'nme',
  };
  return item;
};

const mockWasmsBalances = (balances = 5) => {
  const list = new Array(balances).fill(null).map(() => mockWasmsBalance());
  return list;
};

export { mockWasmsBalance, mockWasmsBalances };
