<template>
  <v-layout>
    <v-row>
      <v-col
        cols="12"
        :md="$config.validators.isMissingBlocksChecker ? 4 : 6"
        order="1"
        order-md="2"
      >
        <ValidatorDetailsDelegationsTable :delegations="delegations" />
      </v-col>
      <v-col
        cols="12"
        :md="$config.validators.isMissingBlocksChecker ? 4 : 6"
        order="2"
        order-md="3"
      >
        <ValidatorDetailsDelegatorsTable :account="account" />
      </v-col>
      <v-col
        v-if="$config.validators.isMissingBlocksChecker"
        cols="12"
        md="4"
        order="3"
        order-md="1"
      >
        <ValidatorDetailsBlocks />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ValidatorDetailsBlocks from './ValidatorDetailsBlocks';
import ValidatorDetailsDelegationsTable from './ValidatorDetailsDelegationsTable';
import ValidatorDetailsDelegatorsTable from './ValidatorDetailsDelegatorsTable';

export default {
  name: 'ValidatorDetailsMiddleBody',
  components: {
    ValidatorDetailsBlocks,
    ValidatorDetailsDelegationsTable,
    ValidatorDetailsDelegatorsTable,
  },
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
    delegations: {
      type: Object,
      required: true,
      note: 'The account delegations',
    },
  },
};
</script>
