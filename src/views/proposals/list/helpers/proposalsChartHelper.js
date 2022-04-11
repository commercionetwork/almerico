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
    console.log(counts);
    return {
      labels: Object.values(PROPOSALS.TEXTS),
      datasets: [
        {
          data: [],
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
  const counts = [];
  const statuses = Object.keys(PROPOSALS.TEXTS);
  statuses.forEach((status) => {
    const count = data.filter((it) => it.status === status).length;
    counts.push({ [status]: count });
  });
  return counts;
};
