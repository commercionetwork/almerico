<template>
  <v-list-item-content>
    <div>
      <span class="pr-3 text-capitalize font-weight-bold" v-text="label" />
      <a v-if="isUrl" :href="content" target="_blank" v-text="content" />
      <span v-else v-text="content" />
    </div>
  </v-list-item-content>
</template>

<script>
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgUrlComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The item label',
    },
    content: {
      type: String,
      required: true,
      note: 'The item content',
    },
  },
  computed: {
    isUrl() {
      return regExpBuilder.getUrlRegExp().test(this.content);
    },
  },
};
</script>
