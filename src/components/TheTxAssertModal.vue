<template>
  <v-dialog :width="width" v-model="dialog" @click:outside="onClose">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          <div class="primary--text text-h6 font-weight-bold" v-text="title" />
          <div
            v-if="subtitle"
            class="text-subtitle-1 font-italic"
            v-text="subtitle"
          />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="onClose">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="py-3">
        <v-alert border="left" color="info" colored-border>
          <div class="pb-2" v-text="$t('msgs.assertAndViewTx')" />
          <router-link
            target="_blank"
            :to="{
              name: ROUTES.NAME.TRANSACTIONS_DETAIL,
              params: { id: hash },
            }"
          >
            <span
              class="font-monospace"
              style="font-size: 0.8rem"
              v-text="hash"
            />
          </router-link>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';
import { ROUTES } from '@/constants';

export default {
  name: 'TheTxAssertModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: 800,
    },
  },
  emits: ['input'],
  data() {
    return {
      ROUTES,
      mdiClose,
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
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
};
</script>
