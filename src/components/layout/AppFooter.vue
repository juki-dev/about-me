<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="jd-footer">© {{ year }} Juki Dev — Cristian Leandro Henao Santa</footer>
</template>

<style scoped>
.jd-footer {
  text-align: center;
  padding: var(--space-6) var(--space-4);
  border-top: 1px solid var(--color-divider);
  font-size: 12px;
  color: color-mix(in srgb, var(--color-text) 50%, transparent);
}
</style>
