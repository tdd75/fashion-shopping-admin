<template>
  <div class="text-red-accent-3" v-if="range[0]">
    {{
      range[0] != range[1]
        ? `\$${range[0]} - \$${range[1]}`
        : `\$${range[0]}`
    }}
  </div>
  <div class="text-red-accent-3" v-if="value">
    {{ `\$${value}` }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  range: {
    type: Array as PropType<number[]>,
    default: [],
  },
  value: {
    type: Number,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
