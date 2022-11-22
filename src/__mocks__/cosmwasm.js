const mockContract = (id = 10) => {
  const item = `did:com:${id}`;
  return item;
};

const mockContracts = (contracts = 5) => {
  let id = 10;
  const list = new Array(contracts).fill(null).map(() => mockContract(id++));
  return list;
};

const mockEntry = (codeId = 1) => {
  const item = {
    operation: 'operation type',
    code_id: codeId,
    updated: {
      block_height: '1',
      tx_index: '1',
    },
    msg: {
      name: 'name',
      decimals: 'decimals',
      symbol: 'symbol',
    },
  };
  return item;
};

const mockEntries = (entries = 5) => {
  const list = new Array(entries).fill(null).map(() => mockEntry());
  return list;
};

const mockModel = () => {
  const item = {
    key: '6C705F746F6B656E',
    value:
      'ImRpZDpjb206MWFrbXJxejR6bjY3MzY4anFwZThrcHQzY3p0YzR1OTh2cmt4ZjBxNWxnY3hjbnplZjNzY3EwbTgzNmEi',
  };
  return item;
};

const mockModels = (models = 4) => {
  const list = new Array(models).fill(null).map(() => mockModel());
  return list;
};

export {
  mockContract,
  mockContracts,
  mockEntry,
  mockEntries,
  mockModel,
  mockModels,
};
