const { v4: uuidv4 } = require('uuid');

const mockOverviewItem = (rank = 1) => {
  const item = {
    rank,
    label: 'mylabel',
    amount: 1,
    percentage: 1,
    group: 'mygroup',
    style: 'mystyle',
    available: true,
  };
  return item;
};

const mockOverviewItems = (elements = 5) => {
  let rank = 1;
  const items = new Array(elements)
    .fill(null)
    .map(() => mockOverviewItem(rank++));
  return items;
};

const mockOverviewSpec = () => {
  const item = {
    name: 'myname',
    content: 'mycontent',
  };
  return item;
};

const mockOverviewSpecs = (elements = 2) => {
  const items = new Array(elements).fill(null).map(() => mockOverviewSpec());
  return items;
};

const mockOverview = (data = 5, specs = 2) => {
  const id = uuidv4();
  const item = {
    id,
    overviewName: 'name',
    createdAt: '2022-06-15T12:22:09.621Z',
    updatedAt: '2022-06-15T12:22:09.621Z',
    data: mockOverviewItems(data),
    specs: mockOverviewSpecs(specs),
  };
  return item;
};

export {
  mockOverview,
  mockOverviewItem,
  mockOverviewItems,
  mockOverviewSpec,
  mockOverviewSpecs,
};
