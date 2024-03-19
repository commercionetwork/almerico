<template>
  <div>
    <div class="text-right">
      <v-btn text @click="setMax">
        <span class="text-caption info--text" v-text="`Max: ${maxBalance}`" />
      </v-btn>
    </div>
    <v-text-field dense outlined v-model="amount"></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'AssetsModalTransferAmount',
  props: {
    value: {
      type: String,
      required: true,
    },
    maxBalance: {
      type: String,
      default: '0',
    },
  },
  emits: ['input'],
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    setMax() {
      this.amount = this.maxBalance;
    },
  },
};
</script>
