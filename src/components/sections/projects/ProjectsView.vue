<template>
  <section id="projects" class="projects-section content-wrapper">
    <h2 class="ab-title">Projects</h2>
    
    <div class="projects-container">
      <!-- Tag Filter Component -->
      <TagFilter 
        :tags="allTags" 
        :selected-tag="selectedTag"
        @tag-selected="handleTagSelected"
      />
      
      <!-- Projects Grid -->
      <div class="projects-grid">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id"
          :project="project"
        />
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="projects-empty">
        <p>No projects found for the selected tag.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ProjectService } from '@/services/ProjectService'
import type { Project } from '@/types/projects'
import ProjectCard from './ProjectCard.vue'
import TagFilter from './TagFilter.vue'
import './projects.css'

// State
const selectedTag = ref<string | null>(null)
const projects = ref<Project[]>(ProjectService.getProjects())
const allTags = ref<string[]>(ProjectService.getAllTags())

// Computed
const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects.value
  }
  return ProjectService.filterProjectsByTag(selectedTag.value)
})

// Methods
const handleTagSelected = (tag: string | null) => {
  selectedTag.value = tag
}
</script>

<style scoped>
.projects-section {
  padding: 40px 20px;
}

.projects-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.projects-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--main-color);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
