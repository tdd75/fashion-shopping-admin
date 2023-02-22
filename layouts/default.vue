<template>
  <v-app>
    <LayoutDefaultAppBar />
    <LayoutDefaultNavigationDrawer />
    <v-main class="ma-5">
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
