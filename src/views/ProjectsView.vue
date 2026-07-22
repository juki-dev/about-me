<script setup lang="ts">
import BlueprintFrame from '../components/layout/BlueprintFrame.vue'
import ImageSlot from '../components/layout/ImageSlot.vue'
import TagList from '../components/layout/TagList.vue'
import SectionHeading from '../components/layout/SectionHeading.vue'
import { projects } from '../content/projects'
</script>

<template>
  <div class="projects-page">
    <SectionHeading title="Projects" subtitle="Todos los proyectos, de más reciente a más antiguo." />

    <div class="projects-page-grid">
      <RouterLink
        v-for="proj in projects"
        :key="proj.slug"
        :to="{ name: 'project-detail', params: { slug: proj.slug } }"
        class="projects-page-link"
      >
        <BlueprintFrame tag="article" class="card">
          <ImageSlot :src="proj.image" shape="rect" placeholder="Screenshot" class="projects-page-img" />
          <div class="card-kicker">{{ proj.kicker }}</div>
          <div class="card-title">{{ proj.title }}</div>
          <p class="card-body">{{ proj.description }}</p>
          <TagList :tags="proj.tags" variant="accent" />
        </BlueprintFrame>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  padding: var(--space-8) var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}
.projects-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.projects-page-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.projects-page-img {
  width: 100%;
  height: 160px;
}

@media (max-width: 900px) {
  .projects-page-grid {
    grid-template-columns: 1fr;
  }
}
</style>
