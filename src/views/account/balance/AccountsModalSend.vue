<template>
  <v-dialog max-width="800" transition="dialog-transition" v-model="dialog">
    <v-card flat>
      <v-toolbar class="mb-3" flat>
        <v-toolbar-title class="primary--text">
          <span v-text="$t('titles.sendTokens')" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="dialog = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form :disabled="isHandling">
          <v-row>
            <v-col cols="12">
              <base-form-text-field
                id="send-address"
                :label="$t('labels.address')"
                v-model.trim="model.address"
              />
            </v-col>
            <v-col cols="12">
              <base-form-number-field
                id="send-amount"
                :label="$t('labels.amount')"
                v-model.trim="model.amount"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <accounts-modal-btn-send
          :model="model"
          :address="address"
          :balance="balance"
          @sent="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AccountsModalBtnSend from './AccountsModalBtnSend.vue';

import { mdiClose } from '@mdi/js';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountsModalSend',
  components: {
    AccountsModalBtnSend,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Object,
      required: true,
    },
  },
  emits: ['input'],
  data() {
    return {
      mdiClose,
      model: {
        address: '',
        amount: '0.01',
      },
    };
  },
  computed: {
    ...mapGetters('accountBalance', ['isHandling']),
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
