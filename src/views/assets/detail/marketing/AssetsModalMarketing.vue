<template>
  <v-dialog max-width="800" transition="dialog-transition" v-model="dialog">
    <v-card flat>
      <v-toolbar class="mb-3" flat>
        <v-toolbar-title class="primary--text">
          <span v-text="$t('titles.editMarketing')" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="dialog = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <base-form-text-field
                id="marketing-project"
                :label="$t('labels.project')"
                v-model.trim="model.project"
              />
            </v-col>
            <v-col cols="12">
              <base-form-text-field
                id="marketing-description"
                :label="$t('labels.description')"
                v-model.trim="model.description"
              />
            </v-col>
            <v-col cols="12">
              <base-form-text-field
                id="marketing-wallet"
                :label="$t('labels.marketing')"
                v-model.trim="model.marketing"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <assets-modal-btn-marketing :model="model" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AssetsModalBtnMarketing from './AssetsModalBtnMarketing.vue';

import { mdiClose } from '@mdi/js';

export default {
  name: 'AssetsModalMarketing',
  components: {
    AssetsModalBtnMarketing,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    marketing: {
      type: Object,
      required: true,
    },
  },
  emits: ['input'],
  data() {
    return {
      mdiClose,
      model: {
        description: '',
        marketing: '',
        project: '',
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
  created() {
    this.model = {
      description: this.marketing.description,
      marketing: this.marketing.marketing,
      project: this.marketing.project,
    };
  },
};
</script>
