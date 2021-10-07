import { numberIntlFormatter } from '@/utils';

const UNIT_CONVERTER = 1000000;
const BACKGROUND_COLOR = [
  'rgba(255, 159, 64, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 205, 86, 0.2)',
];
const BORDER_COLOR = [
  'rgb(255, 159, 64)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
];
const CHART_OPTIONS = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          const index = tooltipItem.dataIndex;
          return tooltipItem.dataset.data[index].toFixed(0);
        },
      },
    },
  },
};

const accountCapitalizationChartHelper = {
  /**
   *
   * @param {Object} capitalization
   * @returns {Object}
   */
  getChartData(capitalization) {
    const data = [
      capitalization.availables / UNIT_CONVERTER,
      capitalization.delegations / UNIT_CONVERTER,
      capitalization.unbondings / UNIT_CONVERTER,
      capitalization.rewards / UNIT_CONVERTER,
    ];
    return {
      labels: ['Availables', 'Delegations', 'Unbondings', 'Rewards'],
      datasets: [
        {
          data,
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
        },
      ],
    };
  },
  /**
   *
   * @param {Object} capitalization
   * @returns {String}
   */
  getChartLabel(capitalization) {
    const total = _formatTokens(capitalization.total);
    return total ? `COM Total ${total} M` : '-';
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default accountCapitalizationChartHelper;

const _formatTokens = (value) =>
  numberIntlFormatter.toDecimal({
    amount: value / UNIT_CONVERTER,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
