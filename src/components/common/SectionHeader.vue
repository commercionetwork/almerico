<template>
  <div class="row py-3 d-flex align-items-center">
    <div class="col-12 col-md-4">
      <h1
        class="text-uppercase com-font-s20-w800"
        v-html="title"
      />
    </div>
    <div class="col-12 col-md-8">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div
        v-else
        class="row mx-auto p-1 w-100 rounded bg-white"
      >
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Price:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedPrice"
          />
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Height:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedHeight"
          />
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-between justify-content-md-center">
          <span class="com-font-s13-w700">Bonded:</span>
          <span
            class="pl-1 com-font-s13-w400"
            v-html="formattedBonded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stakeApi from "Store/stake/api";
import tendermintApi from "Store/tendermint/api";

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
  data() {
    return {
      bonded: 0,
      height: 0,
      isFetchingBonded: false,
      isFetchingHeight: false
    };
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
    isFetching() {
      return this.isFetchingBonded || this.isFetchingHeight;
    },
    //TODO: remove || get real value
    price() {
      return { value: 1, iso_code: "EUR" };
    }
  },
  methods: {
    async getBonded() {
      this.isFetchingBonded = true;
      try {
        const response = await stakeApi.requestPool();
        this.bonded = response.data.bonded_tokens;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetchingBonded = false;
      }
    },
    async getHeight() {
      this.isFetchingHeight = true;
      try {
        const response = await tendermintApi.requestLastBlock();
        this.height = response.data.block.header.height;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetchingHeight = false;
      }
    }
  },
  created() {
    this.getBonded();
    this.getHeight();
  }
};
</script>
