<template>
  <TopBodyComponent :optionalInfo="true">
    <template v-slot:left-info>
      <TopBodyBlockComponent />
    </template>
    <template v-slot:center-info>
      <DashboardPrice />
    </template>
    <template v-slot:right-info>
      <DashboardPriceChart />
    </template>
    <template v-slot:optional-info>
      <DashboardChart />
    </template>
  </TopBodyComponent>
</template>

<script>
import DashboardChart from './DashboardChart';
import DashboardPrice from './DashboardPrice';
import DashboardPriceChart from './DashboardPriceChart';
import TopBodyBlockComponent from '@/components/TopBodyBlockComponent';
import TopBodyComponent from '@/components/TopBodyComponent';

export default {
  name: 'DashboardTopBody',
  components: {
    DashboardChart,
    DashboardPrice,
    DashboardPriceChart,
    TopBodyBlockComponent,
    TopBodyComponent,
  },
};
</script>
