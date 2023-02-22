<template>
  <v-container>
    <v-col cols="12">
      <v-card class="py-3">
        <v-card-title class="text-primary mb-2">
          <div>
            <div>User List</div>

            <div class="flex justify-space-between">
              <ButtonFloating
                icon="mdi-plus"
                :on-click="
                  () =>
                    navigateTo({
                      name: ROUTE_NAME.PRODUCT.DETAIL,
                      params: { userId: 'add' },
                    })
                "
              ></ButtonFloating>
              <!-- <v-col cols="6">
              <v-text-field
                v-model="userStore.query.search"
                label="Search"
                @keyup.enter="userStore.fetchUsers"
              />
            </v-col> -->
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table-server
            v-model="selected"
            :headers="headers"
            :items="userStore.users"
            :items-length="userStore.totalItems"
            :loading="userStore.isLoading"
            v-model:page="userStore.query.page"
            v-model:itemsPerPage="userStore.query.itemsPerPage"
            v-model:sortBy="userStore.query.sortBy"
            show-select
          >
            <!-- Custom cells -->
            <template #item.last_login="{ item }">
              {{ formatDateTime(item.raw.last_login) }}
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
  title: 'User',
});

const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
  },
  {
    title: 'Name',
    key: 'full_name',
    sortable: false,
  },
  {
    title: 'Email',
    key: 'email',
    sortable: false,
  },
  {
    title: 'Phone',
    key: 'phone',
    sortable: false,
  },
  {
    title: 'Last login',
    key: 'last_login',
    sortable: false,
  },
];

const userStore = useUserStore();
const selected = ref([]);

onMounted(() => {
  userStore.fetchUsers();
});

watch(
  userStore.query,
  () => {
    userStore.fetchUsers();
  },
  { deep: true },
);
</script>

<style lang="scss" scoped></style>
