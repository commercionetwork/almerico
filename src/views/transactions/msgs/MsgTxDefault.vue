<template>
  <MsgTx :title="title">
    <div slot="body">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="row p-1"
      >
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="value[0]"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="value[1]"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

export default {
  name: "MsgTxDefault",
  description: "Display a not handled transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a message"
    }
  },
  computed: {
    values() {
      const value = this.message.value;
      return Object.keys(value).map(key => {
        return [key, value[key]];
      });
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  }
};
</script>
