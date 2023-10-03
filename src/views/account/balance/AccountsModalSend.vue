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
      <v-card-text> </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
  name: 'AccountsModalSend',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    token: {
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
        amount: '',
      },
    };
  },
  computed: {
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
