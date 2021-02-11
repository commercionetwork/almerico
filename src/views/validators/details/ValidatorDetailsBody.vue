<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="4" order="1" order-md="1">
        <ValidatorDetailsAddress :account="account" :operator="operator" />
      </v-col>
      <v-col
        cols="12"
        :md="$config.validators.isMissingBlocksChecker ? 4 : 6"
        order="2"
        order-md="4"
      >
        <ValidatorDetailsSpec />
      </v-col>
      <v-col
        v-if="$config.validators.isMissingBlocksChecker"
        cols="12"
        md="4"
        order="3"
        order-md="5"
      >
        <ValidatorDetailsBlocks />
      </v-col>
      <v-col cols="12" md="4" order="4" order-md="2">
        <ValidatorDetailsChart :delegations="delegations" />
      </v-col>
      <v-col cols="12" md="4" order="5" order-md="3">
        <ValidatorDetailsDelegationsTable :delegations="delegations" />
      </v-col>
      <v-col
        cols="12"
        :md="$config.validators.isMissingBlocksChecker ? 4 : 6"
        order="6"
        order-md="6"
      >
        <ValidatorDetailsDelegatorsTable :account="account" />
      </v-col> </v-row
  ></v-layout>
</template>

<script>
import ValidatorDetailsAddress from './ValidatorDetailsAddress';
import ValidatorDetailsBlocks from './ValidatorDetailsBlocks';
import ValidatorDetailsChart from './ValidatorDetailsChart';
import ValidatorDetailsDelegationsTable from './ValidatorDetailsDelegationsTable';
import ValidatorDetailsDelegatorsTable from './ValidatorDetailsDelegatorsTable';
import ValidatorDetailsSpec from './ValidatorDetailsSpec';

export default {
  name: 'ValidatorDetailsBody',
  components: {
    ValidatorDetailsAddress,
    ValidatorDetailsBlocks,
    ValidatorDetailsChart,
    ValidatorDetailsDelegationsTable,
    ValidatorDetailsDelegatorsTable,
    ValidatorDetailsSpec,
  },
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
    operator: {
      type: String,
      required: true,
      note: 'The operator address',
    },
    delegations: {
      type: Object,
      required: true,
      note: 'The account delegations',
    },
  },
};
</script>
