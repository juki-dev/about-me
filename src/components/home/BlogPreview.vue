<script setup lang="ts">
import { computed } from 'vue'
import BlueprintFrame from '../layout/BlueprintFrame.vue'
import ImageSlot from '../layout/ImageSlot.vue'
import { posts, formatPostDate } from '../../content/blog'

const latest = computed(() => posts.slice(0, 3))
</script>

<template>
  <section id="blog" class="blog">
    <h2 class="blog-title">Blog</h2>
    <p class="blog-subtitle text-muted">Últimas entradas.</p>

    <div class="blog-grid">
      <BlueprintFrame v-for="post in latest" :key="post.slug" tag="article" class="card blog-card">
        <ImageSlot :src="post.image" shape="rect" placeholder="Imagen del post" class="blog-card-img" />
        <div class="card-meta">{{ formatPostDate(post.date) }}</div>
        <div class="card-title">{{ post.title }}</div>
        <p class="card-body">{{ post.excerpt }}</p>
        <RouterLink class="btn btn-ghost blog-card-link" :to="{ name: 'blog-detail', params: { slug: post.slug } }">
          Leer más
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </RouterLink>
      </BlueprintFrame>
    </div>

    <div class="blog-cta">
      <RouterLink class="btn btn-secondary" :to="{ name: 'blog' }">Ver todas las entradas</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.blog {
  padding: var(--space-8) var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}
.blog-title {
  text-align: center;
  margin-bottom: var(--space-2);
}
.blog-subtitle {
  text-align: center;
  margin: 0 auto var(--space-6);
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.blog-card {
  padding: var(--space-3);
}
.blog-card-img {
  width: 100%;
  height: 160px;
}
.blog-card-link {
  align-self: flex-start;
  padding-inline: 0;
}
.blog-cta {
  text-align: center;
  margin-top: var(--space-6);
}

@media (max-width: 900px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
