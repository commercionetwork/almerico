<template>
  <BaseTopContentCard :title="$t('titles.cccExchangeRate')">
    <template v-slot:content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-center"
      >
        <div class="py-1 text-h2 font-weight-black" v-text="rate" />
        <div
          class="text-caption font-weight-bold info--text"
          v-text="$t('msgs.exchangeRateCalc')"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

export default {
  name: 'ExchangeRatePosterComponent',
  components: { BaseTopContentCard },
  props: ['rate'],
};
</script>
