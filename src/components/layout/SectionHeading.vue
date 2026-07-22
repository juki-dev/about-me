<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="section-heading">
    <h2>{{ title }}</h2>
    <p v-if="subtitle" class="text-muted">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-heading {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto var(--space-8);
}
.section-heading h2 {
  margin-bottom: var(--space-2);
}
.section-heading p {
  margin: 0;
}
</style>
