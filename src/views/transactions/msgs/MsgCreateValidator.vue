<template>

</template>

<script>
export default {
  name: "MsgCreateValidator",
  description: "Display a create validator transaction message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a create validator message"
    }
  },
};
</script>
