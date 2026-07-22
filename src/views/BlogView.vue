<script setup lang="ts">
import BlueprintFrame from '../components/layout/BlueprintFrame.vue'
import ImageSlot from '../components/layout/ImageSlot.vue'
import SectionHeading from '../components/layout/SectionHeading.vue'
import { posts, formatPostDate } from '../content/blog'
</script>

<template>
  <div class="blog-page">
    <SectionHeading title="Blog" subtitle="Todas las entradas, de más reciente a más antigua." />

    <div class="blog-page-grid">
      <RouterLink
        v-for="post in posts"
        :key="post.slug"
        :to="{ name: 'blog-detail', params: { slug: post.slug } }"
        class="blog-page-link"
      >
        <BlueprintFrame tag="article" class="card">
          <ImageSlot :src="post.image" shape="rect" placeholder="Imagen del post" class="blog-page-img" />
          <div class="card-meta">{{ formatPostDate(post.date) }}</div>
          <div class="card-title">{{ post.title }}</div>
          <p class="card-body">{{ post.excerpt }}</p>
        </BlueprintFrame>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  padding: var(--space-8) var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}
.blog-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.blog-page-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.blog-page-img {
  width: 100%;
  height: 160px;
}

@media (max-width: 900px) {
  .blog-page-grid {
    grid-template-columns: 1fr;
  }
}
</style>
