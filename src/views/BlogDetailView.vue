<script setup lang="ts">
import { computed } from 'vue'
import ImageSlot from '../components/layout/ImageSlot.vue'
import TagList from '../components/layout/TagList.vue'
import { getPostBySlug, formatPostDate } from '../content/blog'

const props = defineProps<{ slug: string }>()

const post = computed(() => getPostBySlug(props.slug))
</script>

<template>
  <div v-if="post" class="post-detail">
    <RouterLink class="btn btn-ghost post-detail-back" :to="{ name: 'blog' }">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      Todas las entradas
    </RouterLink>

    <div class="card-meta">{{ formatPostDate(post.date) }}</div>
    <h1>{{ post.title }}</h1>
    <TagList v-if="post.tags.length" :tags="post.tags" variant="outline" class="post-detail-tags" />

    <ImageSlot :src="post.image" shape="rect" placeholder="Imagen del post" class="post-detail-img" />

    <div class="markdown-body" v-html="post.html" />
  </div>

  <div v-else class="post-detail-missing">
    <h1>Entrada no encontrada</h1>
    <p class="text-muted">No existe ninguna entrada con ese identificador.</p>
    <RouterLink class="btn btn-secondary" :to="{ name: 'blog' }">Volver al blog</RouterLink>
  </div>
</template>

<style scoped>
.post-detail {
  padding: var(--space-8) var(--space-4);
  max-width: 760px;
  margin: 0 auto;
}
.post-detail-back {
  padding-inline: 0;
  margin-bottom: var(--space-4);
}
.post-detail-tags {
  margin: var(--space-2) 0 var(--space-4);
}
.post-detail-img {
  width: 100%;
  height: 320px;
  margin-bottom: var(--space-4);
}
.post-detail-missing {
  padding: var(--space-8) var(--space-4);
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
</style>
