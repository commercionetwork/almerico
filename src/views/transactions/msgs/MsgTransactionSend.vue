<template>
  <div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.fromAddress')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="fromAddress"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.toAddress')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="toAddress"
      />
    </div>
    <div
      v-for="(amount,index) in amounts"
      :key="index"
      class="row p-1"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="amountLabel(index)"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="amountValue(amount.amount)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgTransactionSend",
  description: "Display a send transaction message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a send message"
    }
  },
  computed: {
    amounts() {
      return this.message.value.amount ? this.message.value.amount : [];
    },
    fromAddress() {
      return this.message.value.from_address ? this.message.value.from_address : "-";
    },
    toAddress() {
      return this.message.value.to_address ? this.message.value.to_address : "-";
    }
  },
  methods: {
    amountLabel(index) {
      const label = this.$t("labels.amount");
      return `${label} (${index + 1})`;
    },
    amountValue(amount) {
      const comm = parseFloat(amount) / 1000000;
      const formatComm = this.$n(comm, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatComm} COMM`;
    }
  },
  created() {
    console.log(this.message)
  }
};
</script>
