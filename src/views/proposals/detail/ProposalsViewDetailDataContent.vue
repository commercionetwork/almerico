<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title
        class="text-capitalize"
        v-text="$t('labels.content')"
      />
      <v-list-item>
        <component
          :is="getComponentName(proposal.content)"
          :content="proposal.content"
        />
      </v-list-item>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import BasePlaceholderComponentError from '@/components/BasePlaceholderComponentError';
import BasePlaceholderComponentLoading from '@/components/BasePlaceholderComponentLoading';
import ContentDefault from './contents/ContentDefault.vue';

import { PROPOSALS } from '@/constants';
import { mapGetters } from 'vuex';

const components = {};
PROPOSALS.SUPPORTED_TYPES.forEach((component) => {
  components[component.name] = () => ({
    component: import(`./contents/${component.name}.vue`),
    loading: BasePlaceholderComponentLoading,
    error: BasePlaceholderComponentError,
    delay: 0,
    timeout: 5000,
  });
});

export default {
  name: 'ProposalsViewDetailDataContent',
  components: {
    ...components,
    ContentDefault,
  },
  data() {
    return {
      model: { components: PROPOSALS.SUPPORTED_TYPES },
    };
  },
  computed: {
    ...mapGetters('proposals', ['proposal']),
  },
  methods: {
    getComponentName(content) {
      const component = this.model.components.find(
        (component) => component.text === content['@type']
      );
      return component ? component.name : ContentDefault.name;
    },
  },
};
</script>
