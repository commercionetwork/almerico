const UNIT_CONVERTER = 1000000;
const MAX_SUPPLY = 60 * UNIT_CONVERTER;

const chartOptions = {
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

const tokensChartHelper = {
  /**
   *
   * @param {Function} translator
   * @param {Object} context The context to bind to the translator function
   * @param {Object} chart
   * @returns {Object}
   */
  getChartData(translator, context, chart) {
    const $t = translator.bind(context);
    const data = chart.data;
    const labels = data.map((it) => {
      const label = $t(`labels.${it.label}`);
      const percentage = (it.percentage * 100).toFixed(2);
      return label + ' ' + percentage + '%';
    });
    const datasets = [
      {
        data: data.map((it) => it.amount),
        backgroundColor: data.map((it) => it.background),
        borderColor: data.map((it) => it.border),
      },
    ];

    return {
      labels,
      datasets,
    };
  },

  getChartLabel(label) {
    const amount = new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(MAX_SUPPLY);
    return `${label} ${amount} COM`;
  },
  getChartOptions() {
    return chartOptions;
  },
};

export default tokensChartHelper;
