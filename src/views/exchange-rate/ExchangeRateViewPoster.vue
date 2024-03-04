<template>
  <base-top-content-card :title="$t('titles.cccExchangeRate')">
    <template #content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-center"
      >
        <div class="py-1 text-h2 font-weight-black" v-text="'1'" />
        <div
          class="text-caption font-weight-bold info--text"
          v-text="$t('msgs.listPrice')"
        />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
export default {
  name: 'ExchangeRateViewPoster',
};
</script>
