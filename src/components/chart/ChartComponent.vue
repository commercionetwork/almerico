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
  name: 'ChartComponent',
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
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    chart: null,
  }),
  computed: {
    el() {
      return document.getElementById(this.id);
    },
  },
  watch: {
    dataset(value) {
      if (value) chartBuilder.update(this.chart, value);
    },
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
  mounted() {
    this.render();
  },
};
</script>
