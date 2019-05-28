<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.transactionDetails')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div class="p-1 rounded-lg bg-light border">
        <div class="row p-1">
          <div class="col-12">
            <h2
              class="com-font-s16-w700"
              v-text="$t('titles.information')"
            />
          </div>
        </div>
        <hr>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">TxHash</div>
          <div class="col-12 col-md-9 text-break com-font-s13-w400">{{ transaction.hash }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Status</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ transaction.result }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Height</div>
          <div class="col-12 col-md-9 com-font-s13-w400">
            <router-link
              :to="toBlockDetails(transaction.height)"
              v-text="transaction.height"
            />
          </div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Time</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ transaction.time.toLocaleString() }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Fee</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ transaction.fee }} ATOM</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Gas (used/wanted)</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ transaction.gas }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Memo</div>
          <div class="col-12 col-md-9 text-lowercase com-font-s13-w400">{{ transaction.memo }}</div>
        </div>
      </div>
      <div class="my-3 p-1 rounded-lg bg-light border">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Msgs</h2>
          </div>
        </div>
        <div class="p-1 rounded bg-white border">
          <div class="row p-1">
            <div class="col-12">
              <h3 class="com-font-s16-w700">Send</h3>
            </div>
          </div>
          <hr>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">From</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">com12wdcfr34ewsdf</div>
          </div>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">To</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">comfr543dgh678kj</div>
          </div>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">Amount</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">{{ transaction.amount }} ATOM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";

import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockTransaction } from "Store/transactions/__mocks__/transactions";

export default {
  name: "TransactionsDetails",
  description: "Display the transaction details",
  components: {
    SectionHeader
  },
  computed: {
    transaction() {
      return mockTransaction(1, this.transactionHash);
    },
    transactionHash() {
      return this.$route.params.id;
    },
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  },
  methods: {
    toBlockDetails(id) {
      return {
        name: ROUTE_NAMES.BLOCKS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
