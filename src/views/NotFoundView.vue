<script setup lang="ts"></script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p class="text-muted">Esta página no existe.</p>
    <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Volver al inicio</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  padding: var(--space-8) var(--space-4);
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  text-align: center;
}
</style>
