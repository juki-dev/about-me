<script setup lang="ts">
import { computed } from 'vue'
import BlueprintFrame from '../layout/BlueprintFrame.vue'
import ImageSlot from '../layout/ImageSlot.vue'
import TagList from '../layout/TagList.vue'
import { projects } from '../../content/projects'

// Duplicated once so the CSS marquee (-50% translate) loops seamlessly.
const loop = computed(() => [
  ...projects.map((p) => ({ ...p, key: `${p.slug}-a` })),
  ...projects.map((p) => ({ ...p, key: `${p.slug}-b` })),
])
</script>

<template>
  <section id="projects" class="projects">
    <h2 class="projects-title">Projects</h2>
    <p class="projects-subtitle text-muted">Una selección de proyectos recientes.</p>

    <div class="jd-marquee-wrap projects-marquee">
      <div class="jd-marquee-track projects-track">
        <RouterLink
          v-for="proj in loop"
          :key="proj.key"
          :to="{ name: 'project-detail', params: { slug: proj.slug } }"
          class="projects-card-link"
        >
          <BlueprintFrame tag="article" class="card projects-card">
            <ImageSlot :src="proj.image" shape="rect" placeholder="Screenshot" class="projects-card-img" />
            <div class="card-kicker">{{ proj.kicker }}</div>
            <div class="card-title">{{ proj.title }}</div>
            <p class="card-body">{{ proj.description }}</p>
            <TagList :tags="proj.tags" variant="accent" />
          </BlueprintFrame>
        </RouterLink>
      </div>
    </div>

    <div class="projects-cta">
      <RouterLink class="btn btn-secondary" :to="{ name: 'projects' }">Ver todos los proyectos</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: var(--space-8) 0;
  max-width: 1200px;
  margin: 0 auto;
}
.projects-title {
  text-align: center;
  margin-bottom: var(--space-2);
  padding: 0 var(--space-4);
}
.projects-subtitle {
  text-align: center;
  margin: 0 auto var(--space-6);
  padding: 0 var(--space-4);
}
.projects-marquee {
  overflow: hidden;
  padding: var(--space-2) 0;
}
.projects-track {
  display: flex;
  gap: var(--space-4);
  width: max-content;
  padding: 0 var(--space-4);
}
.projects-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.projects-card {
  width: 300px;
  flex: none;
  padding: var(--space-3);
}
.projects-card-img {
  width: 100%;
  height: 150px;
}
.projects-cta {
  text-align: center;
  margin-top: var(--space-6);
}
</style>
