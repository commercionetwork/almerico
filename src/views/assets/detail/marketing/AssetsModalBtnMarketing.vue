<template>
  <v-btn color="primary" depressed :loading="isHandling" @click="save">
    <div class="text-caption" v-text="$t('labels.save')" />
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsModalBtnMarketing',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('assets', ['contract', 'isHandling']),
  },
  methods: {
    ...mapActions('assets', ['executeContract']),
    async save() {
      const msg = JSON.stringify({ update_marketing: this.model });
      const res = await this.executeContract({
        contract: this.contract,
        textMsg: msg,
        translator: this.$t,
        context: this,
      });
      if (res) {
        this.$emit('saved');
      }
    },
  },
};
</script>
