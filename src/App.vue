<script setup lang="ts">
import {  RouterView } from 'vue-router'
import AboutMenuVue from './components/AboutMenu.vue';
import ContactMenuVue from './components/ContactMenu.vue';
</script>

<template>
  <AboutMenuVue />
  <main class="about-main">
    <RouterView />
  </main>
  <ContactMenuVue />
</template>

<style scoped>
  .about-main {
    padding-top: 66px;
  }
</style>
