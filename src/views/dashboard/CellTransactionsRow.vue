<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, transaction.height)"
        v-text="transaction.height"
      />
    </td>
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTION_DETAILS, transaction.txhash)"
        v-text="transaction.txhash"
        class="d-block text-truncate"
        style="max-width: 120px;"
      />
    </td>
    <td class="align-middle">
      <span v-text="type" />
    </td>
    <td class="align-middle">
      <span v-text="result" />
    </td>
    <td class="align-middle">
      <span v-text="time" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "CellTransactionsRow",
  description: "Display a row of transactions cell",
  props: {
    transaction: {
      type: Object,
      required: true,
      note: "Object representing a transaction"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    result() {
      return this.resultStatus
        ? this.$t("labels.success")
        : this.$t("labels.fail");
    },
    resultStatus() {
      return this.transaction.logs
        ? this.transaction.logs.find(log => typeof log.success !== undefined)
            .success
        : false;
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleDateString();
    },
    type() {
      if (this.transaction.tx.value.msg.length > 1) return this.$t("messages.multiTypes");
      let type = this.transaction.tx.value.msg.find(
        msg => typeof msg.type !== undefined
      ).type;
      return type.split("/").pop();
    },
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  },
};
</script>
