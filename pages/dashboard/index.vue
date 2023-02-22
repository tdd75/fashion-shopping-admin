<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="mb-4">
          <v-card-text>
            <Line id="my-chart-id" :data="chartData" :options="chartOptions" />
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title> Sales by Product </v-card-title>
          <v-card-text>
            <!-- <div v-for="product in "></div> -->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <Bar id="my-chart-id" :data="chartData" :options="chartOptions" />
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

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    { label: 'Order', data: [40, 20, 12] },
    { label: 'Revenue', data: [30, 50, 90] },
  ],
};
const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
};
</script>

<style lang="scss" scoped></style>
