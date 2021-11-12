<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(prop, index) in props" :key="index">
          <DetailItemComponent
            :label="formatKeyProp(prop[0])"
            :content="prop[1]"
          />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';

export default {
  name: 'TransactionsDetailMessageComponent',
  components: {
    DetailItemComponent,
  },
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
    formatKeyProp(key) {
      return key.replace(/_/g, ' ');
    },
  },
};
</script>
