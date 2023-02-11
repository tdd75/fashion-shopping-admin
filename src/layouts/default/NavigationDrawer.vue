<template>
  <v-navigation-drawer v-model="appStore.toggleDrawer" clipped>
    <router-link to="/" class="text-decoration-none">
      <v-toolbar flat dark color="green">
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
        @click="$router.push(item.path)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
// const selectedItem = ref(0);
const items = [
  { text: 'Dashboard', icon: 'mdi-view-dashboard-outline', path: '/' },
  { text: 'Orders', icon: 'mdi-format-list-bulleted', path: '/admin/order/' },
  { text: 'Products', icon: 'mdi-hanger', path: '/admin/product/' },
  { text: 'Inbox', icon: 'mdi-message-badge-outline', path: '/admin/inbox/' },
];
</script>

<style lang="scss" scoped></style>
