<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-banner two-line class="">
          <template v-slot:icon>
            <v-img
              :src="require('@/assets/logo-commercio.png')"
              alt="Commercio logo"
            />
          </template>
          <span class="text-body-2" v-html="message" />
          <template v-slot:actions>
            <v-btn
              text
              color="indigo accent-4"
              href="https://commercio.network/"
              target="_blank"
            >
              Get Online
            </v-btn>
          </template>
        </v-banner>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DashboardBanner",
  computed: {
    message() {
      return "<strong>Commercio.network: The Digital Transformation Blockchain &trade;</strong>. Create an ID, sign and exchange documents on the first eIDAS compliant Blockchain in Europe.";
    },
  },
};
</script>