<template>
  <v-btn
    position="fixed"
    location="bottom right"
    icon
    class="fab ma-4"
    color="primary"
    :size="58"
    @click="onClick"
  >
    <v-icon :icon="icon" :size="32"></v-icon>
  </v-btn>
</template>

<script lang="ts" setup>
const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
