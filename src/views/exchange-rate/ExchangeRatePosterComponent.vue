<template>
  <TopContentCardComponent :title="$t('titles.cccExchangeRate')">
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
  </TopContentCardComponent>
</template>

<script>
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

export default {
  name: 'ExchangeRatePosterComponent',
  components: { TopContentCardComponent },
  props: ['rate'],
};
</script>
