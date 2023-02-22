<template>
  <v-container>
    <v-col cols="12">
      <v-card class="py-3">
        <v-card-title class="text-primary mb-2">
          <div>
            <div>Product List</div>

            <div class="flex justify-space-between">
              <ButtonFloating
                icon="mdi-plus"
                :on-click="
                  () =>
                    navigateTo({
                      name: ROUTE_NAME.PRODUCT.DETAIL,
                      params: { productId: 'add' },
                    })
                "
              ></ButtonFloating>
              <!-- <v-col cols="6">
              <v-text-field
                v-model="productStore.query.search"
                label="Search"
                @keyup.enter="productStore.fetchProducts"
              />
            </v-col> -->
              <v-btn
                :disabled="selected.length === 0"
                icon="mdi-delete"
                color="error"
                @click="
                  showDialog(
                    NotifyType.ERROR,
                    'Delete selected products?',
                    'Are you sure you want to delete selected products?',
                    'DELETE',
                    deleteSelectedProducts,
                  )
                "
              >
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table-server
            v-model="selected"
            :headers="headers"
            :items="productStore.products"
            :items-length="productStore.totalItems"
            :loading="productStore.isLoading"
            v-model:page="productStore.query.page"
            v-model:itemsPerPage="productStore.query.itemsPerPage"
            v-model:sortBy="productStore.query.sortBy"
            show-select
          >
            <!-- Custom cells -->
            <template #item.id="{ item }">
              <NuxtLink
                :to="{
                  name: ROUTE_NAME.PRODUCT.DETAIL,
                  params: { productId: item.raw.id },
                }"
              >
                {{ item.raw.id }}
              </NuxtLink>
            </template>
            <template #item.price_range="{ item }">
              <Price :range="item.raw.price_range" />
            </template>
            <template #item.rating="{ item }">
              <v-rating
                class="rating-bar text-yellow-darken-2"
                density="compact"
                readonly
                :model-value="item.raw.rating"
              />
            </template>
            <template #item.image="{ item }">
              <img :src="item.raw.image" width="32" />
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
  title: 'Product',
});

const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
  },
  {
    title: 'Name',
    key: 'name',
    sortable: false,
  },
  {
    title: 'Price',
    key: 'price_range',
    sortable: false,
  },
  {
    title: 'Rating',
    key: 'rating',
    sortable: false,
  },
  {
    title: 'Available',
    key: 'stocks',
    sortable: false,
  },
  {
    title: 'Image',
    key: 'image',
    sortable: false,
  },
];

const productStore = useProductStore();
const selected = ref([]);

onMounted(() => {
  productStore.fetchProducts();
});

watch(
  productStore.query,
  () => {
    productStore.fetchProducts();
  },
  { deep: true },
);

const deleteSelectedProducts = () => {
  productStore.bulkDeleteProducts(selected.value);
  selected.value = [];
};
</script>

<style lang="scss" scoped></style>
