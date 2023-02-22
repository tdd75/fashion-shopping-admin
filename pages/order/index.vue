<template>
  <v-container>
    <v-col cols="12">
      <v-card class="py-3">
        <v-card-title class="text-primary mb-2"> Order List </v-card-title>
        <!-- Card Actions -->
        <v-card-title>
          <div class="flex justify-space-between">
            <v-col cols="6">
              <v-text-field
                v-model="orderStore.query.search"
                label="Search"
                @keyup.enter="orderStore.fetchOrders"
              />
            </v-col>
          </div>
        </v-card-title>
        <!-- Card Content -->
        <v-card-text>
          <v-data-table-server
            v-model="selected"
            :headers="headers"
            :items="orderStore.orders"
            :items-length="orderStore.totalItems"
            :loading="orderStore.isLoading"
            v-model:page="orderStore.query.page"
            v-model:itemsPerPage="orderStore.query.itemsPerPage"
            v-model:sortBy="orderStore.query.sortBy"
            show-select
          >
            <!-- Custom cells -->
            <template #item.id="{ item }">
              <NuxtLink
                :to="{
                  name: ROUTE_NAME.ORDER.DETAIL,
                  params: { orderId: item.raw.id },
                }"
              >
                {{ item.raw.id }}
              </NuxtLink>
            </template>
            <template #item.owner="{ item }">
              <div class="text-primary font-weight-bold">
                {{ item.raw.owner.full_name }}
              </div>
            </template>
            <template #item.stage="{ item }">
              {{ enumToCapitalize(item.raw.stage) }}
            </template>
            <template #item.amount="{ item }">
              <Price :value="item.raw.amount" />
            </template>
            <template #item.paid_at="{ item }">
              {{ formatDateTime(item.raw.paid_at) }}
            </template>
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { ROUTE_NAME } from '@/routes';
import { NotifyType } from '@/shared/enums';

useHead({
  title: 'Order',
});

const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
  },
  {
    title: 'Code',
    key: 'code',
    sortable: false,
  },
  {
    title: 'Buyer',
    key: 'owner',
    sortable: false,
  },
  {
    title: 'Stage',
    key: 'stage',
    sortable: false,
  },
  {
    title: 'Amount',
    key: 'amount',
    sortable: false,
  },
  {
    title: 'Payment method',
    key: 'payment_method',
    sortable: false,
  },
  {
    title: 'Paid at',
    key: 'paid_at',
    sortable: false,
  },
];

const orderStore = useOrderStore();
const selected = ref([]);

onMounted(() => {
  orderStore.fetchOrders();
});

watch(
  orderStore.query,
  () => {
    orderStore.fetchOrders();
  },
  { deep: true },
);
</script>

<style lang="scss" scoped></style>
