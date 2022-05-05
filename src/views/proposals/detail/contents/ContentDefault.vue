<template>
  <div>CONTENT_DEFAULT<br />{{ content }}</div>
</template>

<script>
export default {
  name: 'ContentDefault',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
