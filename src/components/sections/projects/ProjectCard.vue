<template>
  <div class="project-card">
    <div class="project-card_header">
      <h3 class="project-card_title">{{ project.title }}</h3>
      <span v-if="project.status" class="project-card_status" :class="`status-${project.status}`">
        {{ formatStatus(project.status) }}
      </span>
    </div>
    
    <p class="project-card_description">{{ project.shortDescription }}</p>
    
    <div class="project-card_tags">
      <span v-for="tag in project.tags" :key="tag" class="project-card_tag">
        {{ tag }}
      </span>
    </div>
    
    <router-link :to="`/projects/${project.id}`" class="project-card_link">
      View Details →
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Project } from '@/types/projects'
import './projects.css'

defineProps<{
  project: Project
}>()

useRouter()

const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
}
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  transition: all 0.3s ease;
  height: 100%;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--main-color);
  transform: translateY(-2px);
}

.project-card_header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.project-card_title {
  margin: 0;
  font-size: 1.3rem;
  color: var(--main-color);
  flex: 1;
}

.project-card_status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-completed {
  background-color: #d4edda;
  color: #155724;
}

.status-in-progress {
  background-color: #fff3cd;
  color: #856404;
}

.status-archived {
  background-color: #e2e3e5;
  color: #383d41;
}

.project-card_description {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  flex-grow: 1;
}

.project-card_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}

.project-card_tag {
  display: inline-block;
  padding: 4px 10px;
  background-color: var(--secondary-color, #f0f0f0);
  color: var(--main-color);
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-card_link {
  align-self: flex-start;
  margin-top: 8px;
  padding: 8px 12px;
  color: var(--main-color);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.project-card_link:hover {
  border-bottom-color: var(--main-color);
}

@media (max-width: 480px) {
  .project-card {
    padding: 16px;
    gap: 10px;
  }

  .project-card_title {
    font-size: 1.1rem;
  }

  .project-card_description {
    font-size: 0.9rem;
  }
}
</style>
