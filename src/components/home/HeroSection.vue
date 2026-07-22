<script setup lang="ts">
import ImageSlot from '../layout/ImageSlot.vue'
import TagList from '../layout/TagList.vue'
import { profile, techTags } from '../../data/profile'
</script>

<template>
  <section id="about" class="hero">
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" class="hero-bg">
      <defs>
        <radialGradient id="jd-moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-accent-100)" stop-opacity="0.9" />
          <stop offset="100%" stop-color="var(--color-accent-100)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="120" r="1.6" fill="var(--color-accent-200)" opacity="0.8" />
      <circle cx="260" cy="80" r="1.2" fill="var(--color-accent-200)" opacity="0.6" />
      <circle cx="380" cy="150" r="1.8" fill="var(--color-accent-200)" opacity="0.7" />
      <circle cx="520" cy="60" r="1.3" fill="var(--color-accent-200)" opacity="0.6" />
      <circle cx="700" cy="110" r="1.6" fill="var(--color-accent-200)" opacity="0.8" />
      <circle cx="830" cy="70" r="1.2" fill="var(--color-accent-200)" opacity="0.5" />
      <circle cx="920" cy="140" r="1.7" fill="var(--color-accent-200)" opacity="0.7" />
      <circle cx="60" cy="200" r="1.2" fill="var(--color-accent-200)" opacity="0.5" />
      <circle cx="610" cy="340" r="70" fill="url(#jd-moon-glow)" />
      <circle cx="610" cy="340" r="40" fill="var(--color-accent-100)" />
      <polygon
        points="0,420 120,300 240,400 360,320 480,410 600,330 720,400 850,310 1000,400 1000,600 0,600"
        fill="var(--color-accent-700)"
      />
      <polygon
        points="0,480 150,380 300,460 460,360 620,460 780,370 1000,460 1000,600 0,600"
        fill="var(--color-accent-800)"
      />
      <polygon points="0,540 200,450 400,530 620,440 820,530 1000,470 1000,600 0,600" fill="var(--color-accent-900)" />
    </svg>

    <ImageSlot :src="profile.photo" class="hero-photo" shape="circle" placeholder="Tu foto" />

    <div class="hero-name">
      <h1>{{ profile.firstName }}</h1>
      <h1>{{ profile.lastName }}</h1>
      <p class="hero-role">{{ profile.role }}</p>
    </div>

    <TagList class="hero-tags" :tags="techTags.map((t) => t.label)" variant="outline" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  gap: var(--space-4);
  background: var(--color-accent-900);
  color: var(--color-bg);
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.hero-photo {
  position: relative;
  z-index: 1;
  width: 220px;
  height: 220px;
  border: 2px solid var(--color-bg);
}
.hero-name {
  position: relative;
  z-index: 1;
}
.hero-name h1 {
  font-size: 44px;
  color: var(--color-bg);
  margin-bottom: var(--space-1);
}
.hero-name h1:last-of-type {
  margin-bottom: var(--space-2);
}
.hero-role {
  margin: 0;
  font-size: 17px;
  color: color-mix(in srgb, var(--color-bg) 75%, transparent);
  font-family: var(--font-heading);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.hero-tags {
  position: relative;
  z-index: 1;
  justify-content: center;
  max-width: 560px;
}
.hero-tags :deep(.tag) {
  border: 1px solid color-mix(in srgb, var(--color-bg) 45%, transparent);
  color: var(--color-bg);
  background: transparent;
}
</style>
