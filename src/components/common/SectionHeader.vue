<template>
  <div class="row py-3 d-flex align-items-center">
    <div class="col-12 col-md-4">
      <h1
        class="text-uppercase com-font-s20-w800"
        v-text="title"
      />
    </div>
    <div class="col-12 col-md-8">
      <div class="row mx-auto p-1 w-100 rounded bg-white">
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.price')"
          />
          <span
            class="pl-1 com-font-s14-w400"
            v-text="price"
          />
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.height')"
          />
          <span
            class="pl-1 com-font-s14-w400"
            v-text="height"
          />
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.bonded')"
          />
          <span
            class="pl-1 com-font-s14-w400"
            v-text="bonded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SectionHeader",
  description: "Display the section header with title and values bar",
  props: {
    title: {
      type: String,
      required: true,
      note: "The section's title"
    }
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
    }),
    ...mapGetters("blocks", {
      block: "lastBlock"
    }),
    price() {
      //TODO: remove hard coded value
      let price = { value: 1, iso_code: "EUR" };
      return this.$n(price.value, {
        style: "currency",
        currency: price.iso_code,
        currencyDisplay: "symbol"
      });
    },
    height() {
      return this.block ? this.block.header.height : "-";
    },
    bonded() {
      return this.pool
        ? this.$n(this.pool.bonded_tokens / 1000000, {
            style: "decimal",
            maximumFractionDigits: 0
          })
        : "-";
    }
  }
};
</script>
