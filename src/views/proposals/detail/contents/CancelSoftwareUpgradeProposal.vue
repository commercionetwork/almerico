<template>
  <div>CANCEL_SOFTWARE_UPGRADE_PROPOSAL<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'CancelSoftwareUpgradeProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
