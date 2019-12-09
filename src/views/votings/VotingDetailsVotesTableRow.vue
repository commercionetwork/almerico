<template>
  <tr class="com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, vote.voter)"
        v-text="vote.voter"
      />
    </td>
    <td class="align-middle text-center">
      <span v-text="vote.option" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "VotingDetailsVotesTableRow",
  description: "Diplay a row of the votes list",
  props: {
    vote: {
      type: Object,
      required: true,
      note: "Object representing a vote"
    }
  },
  data() {
    return { ROUTE_NAMES };
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>