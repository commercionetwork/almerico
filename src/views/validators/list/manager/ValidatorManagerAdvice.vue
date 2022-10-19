<template>
  <v-alert :dismissible="false" border="left" color="warning" prominent text>
    <v-list dense>
      <v-list-item v-for="(message, i) in adviceMessages" :key="i">
        <v-list-item-content>
          <v-list-item-title>
            <span class="text-wrap font-weight-bold" v-text="message" />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-alert>
</template>

<script>
export default {
  name: 'ValidatorManagerAdvice',
  props: ['actionId'],
  computed: {
    adviceMessages() {
      const messages = [];
      if (this.actionId === 1) {
        messages.push(
          this.$t('msgs.delegateAdvice1'),
          this.$t('msgs.delegateAdvice2'),
          this.$t('msgs.delegateAdvice3')
        );
      }
      if (this.actionId === 3) {
        messages.push(this.$t('msgs.undelegateAdvice'));
      }
      return messages;
    },
  },
};
</script>
