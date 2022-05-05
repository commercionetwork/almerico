<template>
  <div>COMMUNITY_POOL_SPEND_PROPOSAL<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'CommunityPoolSpendProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
