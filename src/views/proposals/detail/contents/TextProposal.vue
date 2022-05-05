<template>
  <div>TEXT_PROPOSAL<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'TextProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
