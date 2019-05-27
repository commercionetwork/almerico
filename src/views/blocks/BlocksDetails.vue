<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-8 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="title"
        />
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-start justify-content-md-end">
        &nbsp;
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="p-1 rounded-lg bg-light">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Header</h2>
          </div>
        </div>
        <hr>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Height</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ blockHeight }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Block time</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.time.toLocaleString() }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Block hash</div>
          <div class="col-12 col-md-9 text-break com-font-s13-w400">{{ block.hash }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Number of transactions</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.transactions }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Proposer</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.proposer }}</div>
        </div>
      </div>
      <div class="my-3 p-1 rounded-lg bg-light">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Transactions</h2>
          </div>
        </div>
        <div
          v-if="transactions.length > 0"
          class="table-responsive"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s12-w700">
                <th scope="col">TxHash</th>
                <th scope="col">Type</th>
                <th scope="col">Result</th>
                <th scope="col">Fee</th>
                <th scope="col">Height</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center com-font-s12-w400"
                v-for="transaction in transactions.slice().reverse()"
                :key="transaction.id"
              >
                <td class="align-middle">
                  <router-link
                    :to="toTransactionDetails(transaction.hash)"
                    v-text="transaction.hash"
                    class="d-inline-block text-truncate com-font-s10-w400"
                    style="max-width: 120px;"
                  />
                </td>
                <td
                  class="align-middle"
                  v-text="transaction.type"
                />
                <td
                  class="align-middle"
                  v-text="transaction.result"
                />
                <td class="align-middle">{{ transaction.fee }} ATOM</td>
                <td
                  class="align-middle"
                  v-text="transaction.height"
                />
                <td
                  class="align-middle"
                  v-text="getSeconds(transaction.time)"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockBlock } from "Store/blocks/__mocks__/blocks";
import { mockTransactions } from "Store/transactions/__mocks__/transactions";

export default {
  name: "BlocksDetails",
  description: "Display the block details",
  computed: {
    block() {
      return mockBlock(1, new Date(), this.blockHeight);
    },
    blockHeight() {
      return this.$route.params.id;
    },
    title() {
      let label = this.$t("titles.detailsForBlock");
      let height = this.block.height;
      return `${label} #${height}`;
    },
    transactions() {
      return mockTransactions(5, this.blockHeight);
    }
  },
  methods: {
    getSeconds(time) {
      let seconds = ((new Date() - time) / 1000).toFixed(0);
      return `${seconds}s ago`;
    },
    toTransactionDetails(id) {
      return {
        name: ROUTE_NAMES.TRANSACTIONS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
