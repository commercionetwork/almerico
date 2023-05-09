<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-banner two-line>
          <template #icon>
            <v-img :src="logoSrc" alt="Commercio logo" />
          </template>
          <span class="text-body-2">
            <span class="font-weight-bold">
              {{ $t('msgs.bannerPrimary') }} &trade;.
            </span>
            <span>{{ $t('msgs.bannerSecondary') }}.</span>
          </span>
          <template #actions>
            <v-btn
              color="indigo accent-3"
              href="https://commercio.network/"
              target="_blank"
              text
            >
              <span v-text="$t('labels.getOnline')" />
            </v-btn>
          </template>
        </v-banner>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeViewBanner',
  computed: {
    logoSrc() {
      return require('@/assets/img/logo-green.png');
    },
  },
};
</script>
