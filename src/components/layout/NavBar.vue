<script setup lang="ts">
import ImageSlot from './ImageSlot.vue'
import { profile } from '../../data/profile'

const links = [
  { label: 'About me', hash: '#about' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Blog', hash: '#blog' },
  { label: 'Contact', hash: '#contact' },
]
</script>

<template>
  <nav class="nav jd-nav">
    <RouterLink :to="{ path: '/' }" class="jd-nav-brand">
      <ImageSlot :src="profile.logo" shape="circle" placeholder="Logo" class="jd-nav-logo" />
      <div class="jd-nav-wordmark">
        <div>JUKI</div>
        <div class="jd-nav-wordmark-accent">DEV</div>
      </div>
    </RouterLink>

    <RouterLink
      v-for="link in links"
      :key="link.hash"
      class="jd-nav-link"
      :to="{ path: '/', hash: link.hash }"
    >
      {{ link.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.jd-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--color-accent-900);
  border-bottom: 1px solid color-mix(in srgb, var(--color-bg) 15%, transparent);
}
.jd-nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-right: auto;
  text-decoration: none;
  color: var(--color-bg);
}
.jd-nav-logo {
  width: 44px;
  height: 44px;
  font-size: 9px;
  flex: none;
}
.jd-nav-wordmark {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 15px;
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: var(--color-bg);
}
.jd-nav-wordmark-accent {
  color: var(--color-accent-300);
}
.jd-nav a {
  color: var(--color-bg);
}
</style>
