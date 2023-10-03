<template>
  <v-row>
    <v-col cols="4" offset="4">
      <v-btn block color="primary" depressed>
        <span v-text="$t('labels.send')" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AccountsModalSendBtn',
};
</script>
