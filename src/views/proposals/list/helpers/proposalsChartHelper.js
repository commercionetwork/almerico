import { PROPOSALS } from '@/constants';

const BACKGROUND_COLOR = [
  'rgba(0, 151, 167,1)',
  'rgba(48, 63, 159,1)',
  'rgba(104, 159, 56,1)',
  'rgba(255, 160, 0,1)',
  'rgba(194, 24, 91,1)',
];
const BORDER_COLOR = [
  'rgba(77, 208, 225,1)',
  'rgba(121, 134, 203)',
  'rgba(174, 213, 129,1)',
  'rgba(255, 213, 79,1)',
  'rgba(240, 98, 146,1)',
];

const proposalsChartHelper = {
  getChartData(data) {
    if (!data) return null;
    const counts = _getCounts(data);
    const labels = counts.map(
      (count) =>
        `${PROPOSALS.TEXTS[Object.keys(count)[0]]}: ${Object.values(count)[0]}`
    );
    return {
      labels,
      datasets: [
        {
          data: counts.map((count) => Object.values(count)[0]),
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
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

export default proposalsChartHelper;

const _getCounts = (data) => {
  const occurrences = data.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    return acc;
  }, {});
  const counts = Object.keys(PROPOSALS.TEXTS).map((status) => {
    return occurrences[status]
      ? { [status]: occurrences[status] }
      : { [status]: 0 };
  });
  return counts;
};
