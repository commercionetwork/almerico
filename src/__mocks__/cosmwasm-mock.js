const CONTRACT =
  'did:com:1fg8g6k2le393sgs4q2rv06meren0ze7ngv3w7uq4uq6qfwtg05usvj5gk';

const mockContract = ({ contract = CONTRACT, id = 1 } = {}) => {
  const item = `${contract}${id}`;
  return item;
};

const mockContracts = (contracts = 5) => {
  const list = new Array(contracts)
    .fill(0)
    .map((_, index) => mockContract({ id: index + 1 }));
  return list;
};

const mockModel = ({ key = 'key', value = 'value', id = 1 } = {}) => {
  const item = {
    key: `${key}${id}`,
    value: `${value}${id}`,
  };
  return item;
};

const mockModels = (models = 5) => {
  const list = new Array(models)
    .fill(0)
    .map((_, index) => mockModel({ id: index + 1 }));
  return list;
};

export { mockContract, mockContracts, mockModel, mockModels };
