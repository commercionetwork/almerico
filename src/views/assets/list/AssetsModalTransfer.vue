<template>
  <v-dialog max-width="800" transition="dialog-transition" v-model="dialog">
    <v-card flat>
      <v-toolbar class="mb-3" flat>
        <v-toolbar-title class="primary--text">
          <span v-text="title" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import { TRANSFER } from '@/constants';

export default {
  name: 'AssetsModalTransfer',
  data() {
    return {
      mdiClose,
      dialog: false,
      model: {
        amount: '0.01',
      },
    };
  },
  computed: {
    ...mapGetters('assets', ['modal']),
    ...mapGetters('keplr', ['wallet']),
    token() {
      return this.modal ? JSON.parse(this.modal.token) : null;
    },
    title() {
      if (!this.modal) {
        return '';
      }
      return this.modal.type === TRANSFER.TYPE.DEPOSIT
        ? `${this.$t('titles.deposit')} ${this.token.name}`
        : `${this.$t('titles.withdraw')} ${this.token.name}`;
    },
  },
  watch: {
    modal(value) {
      this.dialog = !!value;
    },
  },
  methods: {
    ...mapActions('assets', ['handleModal']),
    close() {
      this.handleModal(null);
    },
  },
};
</script>
