<template>
  <div>
    <v-btn icon @click="handleBookmark">
      <v-icon v-if="bookmark" color="amber darken-2">
        {{ mdiStar }}
      </v-icon>
      <v-icon v-else color="amber darken-2">{{ mdiStarOutline }}</v-icon>
    </v-btn>
    <v-avatar>
      <v-img v-if="logo" :src="logo" max-height="30" max-width="30">
        <template v-slot:placeholder>
          <v-progress-circular
            :width="2"
            indeterminate
            color="grey lighten-1"
          ></v-progress-circular>
        </template>
      </v-img>
      <v-icon v-else color="grey lighten-1" size="30">
        {{ mdiCog }}
      </v-icon>
    </v-avatar>
    <router-link
      class="text-caption text-decoration-none font-weight-bold"
      v-text="moniker"
      :to="{
        name: ROUTES.NAME.VALIDATORS_DETAIL,
        params: { id: address },
      }"
    />
  </div>
</template>

<script>
import { CONFIG, ROUTES } from '@/constants';
import { mdiCog, mdiStar, mdiStarOutline } from '@mdi/js';
import { storageHandler } from '@/utils';

export default {
  name: 'ValidatorsViewListTableValidator',
  props: ['moniker', 'address', 'bookmark', 'logo'],
  emits: ['handle-bookmark'],
  data() {
    return {
      ROUTES,
      mdiCog,
      mdiStar,
      mdiStarOutline,
    };
  },
  methods: {
    handleBookmark() {
      if (this.bookmark) {
        storageHandler.remove({
          payload: this.address,
          key: CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
        });
      } else {
        storageHandler.set({
          payload: this.address,
          key: CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
        });
      }
      this.$emit('handle-bookmark');
    },
  },
};
</script>
