<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-6">
          <h2
            class="com-font-s16-w700"
            v-text="$t('titles.vote')"
          />
        </div>
        <div class="col-6 d-flex justify-content-end">
          <span class="px-3 border rounded-pill text-secondary bg-light com-font-s12-w400">Quorum: {{ voting.poll.quorum }}%</span>
        </div>
      </div>
      <div class="row p-1">
        <div class="col-12 d-flex flex-column">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.total')"
          />
          <span
            class="com-font-s14-w400"
            v-text="total"
          />
        </div>
      </div>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-3">
          <span class="p-0">
            <DoughnutChart
              :chartdata="chartdata"
              :options="options"
              height="125"
              width="125"
            />
          </span>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="p-1 d-flex flex-column border-left border-primary com-border-w10">
                <div
                  class="com-font-s12-w700"
                  v-text="votes[0].label"
                />
                <div class="d-none d-md-block">
                  <div
                    class="com-font-s12-w400"
                    v-text="votes[0].count.toLocaleString()"
                  />
                  <div class="com-font-s12-w400">{{ votes[0].percent }}%</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="p-1 d-flex flex-column border-left border-warning com-border-w10">
                <div
                  class="com-font-s12-w700"
                  v-text="votes[1].label"
                />
                <div class="d-none d-md-block">
                  <div
                    class="com-font-s12-w400"
                    v-text="votes[1].count.toLocaleString()"
                  />
                  <div class="com-font-s12-w400">{{ votes[1].percent }}%</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="p-1 d-flex flex-column border-left border-danger com-border-w10">
                <div
                  class="com-font-s12-w700"
                  v-text="votes[2].label"
                />
                <div class="d-none d-md-block">
                  <div
                    class="com-font-s12-w400"
                    v-text="votes[2].count.toLocaleString()"
                  />
                  <div class="com-font-s12-w400">{{ votes[2].percent }}%</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="p-1 d-flex flex-column border-left border-secondary com-border-w10">
                <div
                  class="com-font-s12-w700"
                  v-text="votes[3].label"
                />
                <div class="d-none d-md-block">
                  <div
                    class="com-font-s12-w400"
                    v-text="votes[3].count.toLocaleString()"
                  />
                  <div class="com-font-s12-w400">{{ votes[3].percent }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

export default {
  name: "VotingsDetailsVote",
  description: "Display the voting data",
  components: {
    DoughnutChart
  },
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a voting"
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                data["labels"][tooltipItem["index"]] +
                ": " +
                data["datasets"][0]["data"][tooltipItem["index"]] +
                "%"
              );
            }
          }
        }
      }
    };
  },
  computed: {
    isFetching() {
      return false;
    },
    quorum() {
      let quorum = this.voting.poll.quorum;
      return `${quorum}%`;
    },
    total() {
      let total = this.voting.poll.total.toLocaleString();
      return `${total} ATOM`;
    },
    votes() {
      return this.voting.poll.votes;
    },
    labels() {
      let labels = [];
      this.votes.forEach(vote => {
        labels.push(vote.label);
      });
      return labels;
    },
    data() {
      let data = [];
      this.votes.forEach(vote => {
        data.push(vote.percent);
      });
      return data;
    },
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ["#38BA8C", "#FFCC33", "#CC3333", "#3C3C3C"]
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.com-border-w10 {
  border-width: 10px !important;
}
</style>
