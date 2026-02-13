<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ProjectService } from '@/services/ProjectService'
import './projects.css'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.id as string)
const project = computed(() => ProjectService.getProjectById(projectId.value))

const goBack = () => {
  router.push('/projects')
}
</script>

<template>
  <div class="project-detail">
    <button @click="goBack" class="back-button">← Back to Projects</button>
    
    <div v-if="project" class="project-detail_content">
      <h1 class="project-detail_title">{{ project.title }}</h1>
      
      <div class="project-detail_tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      
      <div class="project-detail_description">
        {{ project.fullDescription }}
      </div>
      
      <div v-if="project.technologies" class="project-detail_technologies">
        <h3>Technologies</h3>
        <ul>
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
      </div>
      
      <div v-if="project.images" class="project-detail_images">
        <img v-for="(image, index) in project.images" :key="index" :src="image" :alt="`${project.title} image ${index + 1}`" />
      </div>
      
      <div class="project-detail_metadata">
        <p v-if="project.date"><strong>Date:</strong> {{ project.date }}</p>
        <p v-if="project.status"><strong>Status:</strong> {{ project.status }}</p>
        <p v-if="project.link"><strong>Link:</strong> <a :href="project.link" target="_blank">{{ project.link }}</a></p>
      </div>
    </div>
    
    <div v-else class="project-detail_error">
      <p>Project not found</p>
      <button @click="goBack" class="back-button">Return to Projects</button>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  background-color: var(--main-color, #333);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.back-button:hover {
  opacity: 0.8;
}

.project-detail_content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-detail_title {
  font-size: 2.5rem;
  margin: 0;
}

.project-detail_tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 20px;
  font-size: 0.875rem;
}

.project-detail_description {
  line-height: 1.6;
  font-size: 1.1rem;
}

.project-detail_technologies {
  margin-top: 1rem;
}

.project-detail_technologies h3 {
  margin-top: 0;
}

.project-detail_technologies ul {
  list-style-position: inside;
  padding-left: 0;
}

.project-detail_images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.project-detail_images img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.project-detail_metadata {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.project-detail_metadata p {
  margin: 0.5rem 0;
}

.project-detail_metadata a {
  color: var(--main-color, #333);
  text-decoration: none;
}

.project-detail_metadata a:hover {
  text-decoration: underline;
}

.project-detail_error {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>
