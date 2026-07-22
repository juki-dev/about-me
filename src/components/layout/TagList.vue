<script setup lang="ts">
withDefaults(
  defineProps<{
    tags: string[]
    variant?: 'accent' | 'outline' | 'neutral'
  }>(),
  { variant: 'outline' },
)
</script>

<template>
  <div class="tag-list">
    <span v-for="tag in tags" :key="tag" class="tag" :class="`tag-${variant}`">{{ tag }}</span>
  </div>
</template>

<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
