<template>
  <div>SOFTWARE_UPGRADE_PROPOSAL<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'SoftwareUpgradeProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
  computed: {},
};
</script>
