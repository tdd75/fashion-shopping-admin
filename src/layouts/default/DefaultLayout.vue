<template>
  <v-app>
    <AppBar />
    <NavigationDrawer />
    <MainView />
  </v-app>
</template>

<script setup>
import AppBar from './AppBar.vue';
import MainView from './MainView.vue';
import NavigationDrawer from '@/layouts/default/NavigationDrawer.vue';

</script>
