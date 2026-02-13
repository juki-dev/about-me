<template>
  <div class="tag-filter">
    <div class="tag-filter_header">
      <h3 class="tag-filter_title">Filter by Tag</h3>
    </div>
    
    <div class="tag-filter_buttons">
      <button 
        class="tag-filter_button tag-filter_button--all"
        :class="{ 'tag-filter_button--active': selectedTag === null }"
        @click="handleTagClick(null)"
      >
        All Projects
      </button>
      
      <button 
        v-for="tag in tags" 
        :key="tag"
        class="tag-filter_button"
        :class="{ 'tag-filter_button--active': selectedTag === tag }"
        @click="handleTagClick(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './projects.css'

defineProps<{
  tags: string[]
  selectedTag: string | null
}>()

const emit = defineEmits<{
  'tag-selected': [tag: string | null]
}>()

const handleTagClick = (tag: string | null) => {
  emit('tag-selected', tag)
}
</script>

<style scoped>
.tag-filter {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}

.tag-filter_header {
  margin: 0;
}

.tag-filter_title {
  margin: 0;
  font-size: 1.1rem;
  color: var(--main-color);
  font-weight: 600;
}

.tag-filter_buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-filter_button {
  padding: 8px 16px;
  border: 2px solid var(--main-color);
  background-color: white;
  color: var(--main-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag-filter_button:hover {
  background-color: var(--main-color);
  color: white;
}

.tag-filter_button--active {
  background-color: var(--main-color);
  color: white;
}

.tag-filter_button--all {
  font-weight: 600;
}

@media (max-width: 480px) {
  .tag-filter {
    padding: 15px;
  }

  .tag-filter_button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>
