<template>
  <div class="bg-slate-50">asdasd</div>
</template>

<script lang="ts" setup>
import { ROUTE_NAME } from '@/routes';

onMounted(() => {
  navigateTo({
    name: ROUTE_NAME.DASHBOARD.BASE,
  });
});
</script>

<style lang="scss" scoped></style>
