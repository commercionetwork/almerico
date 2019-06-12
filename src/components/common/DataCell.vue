<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div
      v-else
      class="container"
    >
      <div class="row">
        <div class="col-6">
          <div
            class="d-flex align-items-start flex-column"
            :style="cellHeight"
          >
            <div class="mb-auto justify-content-start">
              <slot name="top-left-content" />
            </div>
            <div class="justify-content-end">
              <slot name="bottom-left-content" />
            </div>
          </div>
        </div>
        <div class="col-6">
          <div
            class="d-flex align-items-end flex-column"
            :style="cellHeight"
          >
            <div class="mb-auto justify-content-start">
              <slot name="top-right-content" />
            </div>
            <div class="justify-content-end">
              <slot name="bottom-right-content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataCell",
  description: "Display data with 4 slots",
  props: {
    isFetching: {
      type: Boolean,
      default: false,
      note: "Toogle the loading message"
    },
    height: {
      type: String,
      default: "100",
      note: "The cell height"
    }
  },
  data() {
    return {
      cellHeight:{
        height: `${this.height}px`
      }
    }
  }
};
</script>
