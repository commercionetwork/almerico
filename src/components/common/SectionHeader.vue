<template>
  <div class="row py-3 d-flex align-items-center">
    <div class="col-12 col-md-4">
      <h1
        class="text-uppercase com-font-s20-w800"
        v-html="title"
      />
    </div>
    <div class="col-12 col-md-8">
      <div class="row mx-auto p-1 w-100 rounded bg-white">
        <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Price:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedPrice"
          />
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Height:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedHeight"
          />
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Bonded:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedBonded"
          />
        </div>
        <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Inflation:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedInflation"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  description: "Display the section header with title and values bar",
  props: {
    title: {
      type: String,
      required: true,
      note: "The section's title"
    },
    price: {
      type: Object,
      required: true,
      note: "Object representing the price"
    },
    height: {
      type: Number,
      required: true,
      note: "The height's value"
    },
    bonded: {
      type: Number,
      required: true,
      note: "The bonded's value"
    },
    inflation: {
      type: Number,
      required: true,
      note: "The inflation's value"
    }
  },
  computed: {
    formattedPrice() {
      let currencyIsoCode = this.price.iso_code ? this.price.iso_code : "EUR";
      return this.$n(this.price.value, {
        style: "currency",
        currency: currencyIsoCode,
        currencyDisplay: "symbol"
      });
    },
    formattedHeight() {
      return this.$n(this.height, {
        style: "decimal",
        maximumFractionDigits: 0
      });
    },
    formattedBonded() {
      return this.$n(this.bonded, {
        style: "decimal",
        maximumFractionDigits: 0
      });
    },
    formattedInflation() {
      return this.$n(this.inflation, {
        style: "percent",
        maximumFractionDigits: 2
      });
    }
  }
};
</script>
