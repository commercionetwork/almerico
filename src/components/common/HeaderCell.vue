<template>
  <div class="p-1">
    <div
      v-if="isFetching"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else
      class="container"
      data-test="items"
    >
      <div class="row">
        <div :class="[chart ? 'col-12 col-sm-4' : 'col-12']">
          <div class="d-flex flex-column justify-content-between align-items-start">
            <div class="text-uppercase com-font-s14-w700">
              <slot name="header" />
            </div>
            <div class="py-3 com-font-s16-w700">
              <slot name="body" />
            </div>
            <div class="com-font-s12-w300">
              <slot name="footer" />
            </div>
          </div>
        </div>
        <div
          v-if="chart"
          class="col-12 col-sm-8"
          data-test="item-chart"
        >
          <slot name="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCell",
  desciption: "Show header data and a graph in 2 columns",
  props: {
    chart: {
      type: Boolean,
      default: false,
      note: "Show the chart"
    },
    isFetching: {
      type: Boolean,
      default: false,
      note: "Toogle the loading message"
    }
  }
};
</script>
