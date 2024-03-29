<template>
  <canvas :id="id" :height="height" :width="width"></canvas>
</template>

<script>
import chartBuilder from './helpers/chartBuilder';

const allowedTypes = [
  'bar',
  'bubble',
  'doughnut',
  'line',
  'pie',
  'polarArea',
  'radar',
  'scatter',
];

export default {
  name: 'BaseChart',
  props: {
    id: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: '100',
    },
    width: {
      type: String,
      default: '100',
    },
    type: {
      type: String,
      required: true,
      validator: (type) => allowedTypes.indexOf(type) > -1,
    },
    dataset: {
      type: Object,
      required: true,
    },
    options: {
      type: [Object],
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    el() {
      return document.getElementById(this.id);
    },
  },
  watch: {
    dataset(value) {
      if (value)
        chartBuilder.update(this.chart, { data: value, options: this.options });
    },
    options(value) {
      if (value)
        chartBuilder.update(this.chart, { data: this.dataset, options: value });
    },
  },
  mounted() {
    this.render();
  },
  beforeDestroy() {
    chartBuilder.destroy(this.chart);
  },
  methods: {
    render() {
      this.chart = chartBuilder.build({
        el: this.el,
        type: this.type,
        data: this.dataset,
        options: this.options,
      });
    },
  },
};
</script>
