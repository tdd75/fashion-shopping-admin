<template>
  <ClientOnly>
    <v-navigation-drawer v-model="appStore.toggleDrawer" clipped>
      <router-link to="/" class="text-decoration-none">
        <v-toolbar flat color="primary">
          <img src="@/assets/logo.png" width="36" class="ms-3 me-3" />
          <div>Fashion Shopping App</div>
        </v-toolbar>
      </router-link>
      <v-divider></v-divider>

      <v-list :lines="false" nav>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :value="item"
          active-color="primary"
          @click="navigateTo({ name: item.value })"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ROUTE_NAME } from '@/routes';

const appStore = useAppStore();

const items = [
  {
    text: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    value: ROUTE_NAME.DASHBOARD.BASE,
  },
  {
    text: 'Users',
    icon: 'mdi-account-circle-outline',
    value: ROUTE_NAME.USER.BASE,
  },
  {
    text: 'Orders',
    icon: 'mdi-format-list-bulleted',
    value: ROUTE_NAME.ORDER.BASE,
  },
  { text: 'Products', icon: 'mdi-hanger', value: ROUTE_NAME.PRODUCT.BASE },
  {
    text: 'Inbox',
    icon: 'mdi-message-badge-outline',
    value: ROUTE_NAME.INBOX.BASE,
  },
];
</script>

<style lang="scss" scoped></style>
