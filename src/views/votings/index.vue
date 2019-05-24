<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votings')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12 col-md-6 p-1">
          <CellVoting :voting="voting" />
        </div>
        <div class="col-12 col-md-6 p-1">
          <CellVoting :voting="voting" />
        </div>
        <div class="col-12 col-md-6 p-1">
          <CellVoting :voting="voting" />
        </div>
        <div class="col-12 col-md-6 p-1">
          <CellVoting :voting="voting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellVoting from "./CellVoting.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

export default {
  name: "Votings",
  description: "Container for votings' section",
  components: {
    CellVoting,
    SectionHeader
  },
  computed: {
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    },
    voting() {
      return {
        id: 1,
        hashtag: "#1",
        status: "Passed",
        polls: {
          labels: ["Yes", "No", "Veto", "Abstain"],
          datasets: [
            {
              data: [71.95, 20.12, 4.14, 3.79],
              backgroundColor: ["#38BA8C", "#FFCC33", "#CC3333", "#3C3C3C"]
            }
          ]
        }
      };
    }
  }
};
</script>
