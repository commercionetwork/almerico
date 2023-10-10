<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
      <v-btn
        block
        color="primary"
        depressed
        :loading="isHandling"
        @click="save"
      >
        <div class="text-caption" v-text="$t('labels.save')" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsModalBtnLogo',
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
    ...mapActions('assets', ['handleAsset']),
    async save() {
      const msg = JSON.stringify({ upload_logo: { url: this.model.url } });
      const res = await this.handleAsset({
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
