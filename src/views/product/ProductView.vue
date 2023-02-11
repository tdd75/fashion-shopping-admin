<template>
  {{ productStore.products }}
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { useProductStore } from '@/store/product';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const headers = [
  {
    title: 'Id',
    field: 'id',
  },
  {
    title: 'Name',
    field: 'name',
  },

  {
    title: 'Description',
    field: 'description',
  },
  {
    title: 'Category',
    field: 'category',
  },
  {
    title: 'Image',
    field: 'image',
  },
  {
    title: 'Rating',
    field: 'rating',
  },
  //   {
  //     title: 'Num sold',
  //     field: 'num_sold',
  //   },
  {
    title: 'Count in stock',
    field: 'stocks',
  },
];
</script>

<style lang="scss" scoped></style>
