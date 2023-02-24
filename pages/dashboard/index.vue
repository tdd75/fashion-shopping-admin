<template>
  <v-container v-if="!analyticStore.isLoading">
    <v-row>
      <v-col cols="6">
        <v-card class="mb-4">
          <v-card-text>
            <Line
              id="my-chart-id"
              :data="revenueData"
              :options="chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <Bar id="my-chart-id" :data="orderData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { Line, Bar } from 'vue-chartjs';

useHead({
  title: 'Dashboard',
});

const analyticStore = useAnalyticStore();

const revenueData = computed(() => {
  return {
    labels: analyticStore.analytic.revenue.map((item) =>
      formatMonth(item.month),
    ),
    datasets: [
      {
        label: 'Revenue',
        data: analyticStore.analytic.revenue.map((item) => item.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
});

const orderData = computed(() => {
  return {
    labels: analyticStore.analytic.order.map((item) => formatMonth(item.month)),
    datasets: [
      {
        label: 'Order',
        data: analyticStore.analytic.order.map((item) => item.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
});
const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
};

onMounted(() => {
  analyticStore.getAnalytic();
});
</script>

<style lang="scss" scoped></style>
