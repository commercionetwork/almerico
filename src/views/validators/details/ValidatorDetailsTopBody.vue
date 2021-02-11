<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <ValidatorDetailsAddress :account="account" :operator="operator" />
      </template>
      <template v-slot:center>
        <ValidatorDetailsChart :delegations="delegations" />
      </template>
      <template v-slot:right>
        <ValidatorDetailsDelegationsTable :delegations="delegations" />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import TopBody from '@/components/TopBody';
import ValidatorDetailsDelegationsTable from './ValidatorDetailsDelegationsTable';
import ValidatorDetailsAddress from './ValidatorDetailsAddress';
import ValidatorDetailsChart from './ValidatorDetailsChart';

export default {
  name: 'ValidatorDetailsTopBody',
  components: {
    TopBody,
    ValidatorDetailsDelegationsTable,
    ValidatorDetailsAddress,
    ValidatorDetailsChart,
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
