<template>
  <div>PARAMETER_CHANGE_PROPOSAL<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'ParameterChangeProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
