<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <div class="jd-app">
    <NavBar />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
.jd-app {
  min-height: 100vh;
}
</style>
