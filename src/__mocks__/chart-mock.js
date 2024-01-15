const { v4: uuidv4 } = require('uuid');

const mockChartItem = (chartId = uuidv4(), rank = 1) => {
  const item = {
    id: uuidv4(),
    rank,
    label: 'mylabel',
    amount: 1,
    percentage: 1,
    background: 'mybackground',
    border: 'myborder',
    chartId,
    createdAt: '2022-06-07T14:37:43.420Z',
    updatedAt: '2022-06-07T14:37:43.420Z',
  };
  return item;
};

const mockChartItems = (chartId, elements = 5) => {
  let rank = 1;
  const items = new Array(elements)
    .fill(null)
    .map(() => mockChartItem(chartId, rank++));
  return items;
};

const mockChart = (items = 5) => {
  const id = uuidv4();
  const item = {
    id,
    chartName: 'name',
    type: 'type',
    createdAt: '2022-06-15T12:22:09.621Z',
    updatedAt: '2022-06-15T12:22:09.621Z',
    data: mockChartItems(id, items),
  };
  return item;
};

export { mockChart, mockChartItem, mockChartItems };
