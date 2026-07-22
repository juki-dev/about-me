<script setup lang="ts">
import { computed } from 'vue'
import ImageSlot from '../components/layout/ImageSlot.vue'
import TagList from '../components/layout/TagList.vue'
import { getProjectBySlug } from '../content/projects'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))
</script>

<template>
  <div v-if="project" class="project-detail">
    <RouterLink class="btn btn-ghost project-detail-back" :to="{ name: 'projects' }">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      Todos los proyectos
    </RouterLink>

    <div class="card-kicker">{{ project.kicker }}</div>
    <h1>{{ project.title }}</h1>
    <TagList :tags="project.tags" variant="accent" class="project-detail-tags" />

    <ImageSlot
      :src="project.image"
      shape="rect"
      placeholder="Screenshot"
      class="project-detail-img"
    />

    <div class="project-detail-links" v-if="project.repoUrl || project.liveUrl">
      <a v-if="project.repoUrl" class="btn btn-secondary" :href="project.repoUrl" target="_blank" rel="noreferrer">
        Repositorio
      </a>
      <a v-if="project.liveUrl" class="btn btn-primary" :href="project.liveUrl" target="_blank" rel="noreferrer">
        Ver en vivo
      </a>
    </div>

    <div class="markdown-body" v-html="project.html" />
  </div>

  <div v-else class="project-detail-missing">
    <h1>Proyecto no encontrado</h1>
    <p class="text-muted">No existe ningún proyecto con ese identificador.</p>
    <RouterLink class="btn btn-secondary" :to="{ name: 'projects' }">Volver a proyectos</RouterLink>
  </div>
</template>

<style scoped>
.project-detail {
  padding: var(--space-8) var(--space-4);
  max-width: 760px;
  margin: 0 auto;
}
.project-detail-back {
  padding-inline: 0;
  margin-bottom: var(--space-4);
}
.project-detail-tags {
  margin: var(--space-2) 0 var(--space-4);
}
.project-detail-img {
  width: 100%;
  height: 320px;
  margin-bottom: var(--space-4);
}
.project-detail-links {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}
.project-detail-missing {
  padding: var(--space-8) var(--space-4);
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
</style>
