<template>
  <canvas :id="id" :height="height" :width="width"></canvas>
</template>

<script>
import chartBuilder from './chartBuilder';

const allowedTypes = [
  'bar',
  'bubble',
  'doughnut',
  'line',
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
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    el() {
      return document.getElementById(this.id);
    },
  },
  methods: {
    render() {
      return chartBuilder.build({
        el: this.el,
        type: this.type,
        data: this.data,
        options: this.options,
      });
    },
  },
  mounted() {
    this.render();
  },
};
</script>
