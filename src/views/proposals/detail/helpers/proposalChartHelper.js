const BACKGROUND_COLOR = [
  'rgba(104, 159, 56,1)',
  'rgba(0, 151, 167,1)',
  'rgba(255, 160, 0,1)',
  'rgba(194, 24, 91,1)',
];
const BORDER_COLOR = [
  'rgba(174, 213, 129,1)',
  'rgba(77, 208, 225,1)',
  'rgba(255, 213, 79,1)',
  'rgba(240, 98, 146,1)',
];

const proposalChartHelper = {
  getChartData({ data, labels }) {
    if (!data) return null;
    const processed = _processData(data);
    return {
      labels: [
        `${labels.yes}: ${_formatPercent(processed.yes)}`,
        `${labels.abstain}: ${_formatPercent(processed.abstain)}`,
        `${labels.no}: ${_formatPercent(processed.no)}`,
        `${labels.noWithVeto}: ${_formatPercent(processed.no_with_veto)}`,
      ],
      datasets: [
        {
          data: [
            processed.yes,
            processed.abstain,
            processed.no,
            processed.no_with_veto,
          ],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  getChartOptions({ title, darkTheme }) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          align: 'start',
          font: {
            size: 24,
          },
          color: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(25, 25, 25, 1)',
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(25, 25, 25, 1)',
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label;
            },
          },
        },
      },
    };
  },
};

export default proposalChartHelper;

const _processData = (data) => {
  const item = _convertToNumber(data);
  const total = _calcTotal(item);
  return _calcPercent(item, total);
};

const _convertToNumber = (data) => {
  const item = { ...data };
  for (const k in item) {
    item[k] *= 1;
  }
  return item;
};

const _calcTotal = (data) => {
  let tot = 0;
  for (const k in data) {
    tot += data[k];
  }
  return tot;
};

const _calcPercent = (data, total) => {
  for (const k in data) {
    data[k] = data[k] / total;
  }
  return data;
};

const _formatPercent = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
