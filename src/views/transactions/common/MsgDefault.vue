<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="pb-1 font-weight-bold"
              v-text="$t('titles.message')"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(prop, index) in props" :key="index">
          <DetailItemComponent
            :label="formatKeyProp(prop[0])"
            :content="prop[1]"
            :isLoop="true"
          />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';

export default {
  name: 'MsgDefault',
  components: { DetailItemComponent },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a message',
    },
  },
  computed: {
    props() {
      const value = this.message;
      return Object.keys(value).map((key) => {
        return [key, value[key]];
      });
    },
  },
  methods: {
    formatKeyProp(str) {
      return str.replace(/_/g, ' ');
    },
  },
};
</script>
