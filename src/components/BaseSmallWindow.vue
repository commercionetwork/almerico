<template>
  <v-row>
    <v-col cols="12" md="8" offset-md="2">
      <v-card flat outlined class="px-1 px-md-5">
        <v-toolbar color="rgba(0, 0, 0, 0)" flat>
          <v-toolbar-title class="primary--text">
            <div v-text="title" />
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="$router.back()">
            <v-icon>{{ mdiCloseThick }}</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <slot name="main-content" />
        </v-card-text>
        <v-card-actions>
          <slot name="bottom-content" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiCloseThick } from '@mdi/js';

export default {
  name: 'BaseSmallWindow',
  props: {
    title: {
      type: String,
      required: true,
      note: 'The window title',
    },
  },
  data() {
    return {
      mdiCloseThick,
    };
  },
};
</script>
