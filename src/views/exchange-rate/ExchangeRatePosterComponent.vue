<template>
  <TopContentCardComponent :title="$t('titles.cccExchangeRate')">
    <template v-slot:content>
      <v-row class="fill-height d-flex align-center">
        <v-col cols="12" class="mx-auto">
          <div class="py-1 text-h2 font-weight-black" v-text="rate" />
          <div
            class="text-caption font-weight-bold info--text"
            v-text="$t('msgs.exchangeRateCalc')"
          />
        </v-col>
      </v-row>
    </template>
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

export default {
  name: 'ExchangeRatePosterComponent',
  components: { TopContentCardComponent },
  props: {
    rate: {
      type: String,
      required: true,
      note: 'The exchange rate',
    },
  },
};
</script>
