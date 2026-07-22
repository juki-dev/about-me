<script setup lang="ts">
import BlueprintFrame from '../layout/BlueprintFrame.vue'
import ImageSlot from '../layout/ImageSlot.vue'
import TagList from '../layout/TagList.vue'
import { courses, education, volunteer, type TrayectoriaItem } from '../../data/trayectoria'

const columns: { kicker: string; title: string; items: TrayectoriaItem[] }[] = [
  { kicker: 'Aprendizaje continuo', title: 'Cursos completados', items: courses },
  { kicker: 'Formación', title: 'Educación formal', items: education },
  { kicker: 'Comunidad', title: 'Voluntariado', items: volunteer },
]
</script>

<template>
  <section id="trayectoria" class="trayectoria">
    <h2 class="trayectoria-title">Trayectoria</h2>
    <p class="trayectoria-subtitle text-muted">
      Cursos culminados, educación formal y organizaciones donde he aportado como voluntario.
    </p>

    <div class="trayectoria-grid">
      <BlueprintFrame v-for="col in columns" :key="col.title" tag="div" class="trayectoria-card">
        <div class="card-kicker">{{ col.kicker }}</div>
        <div class="card-title trayectoria-card-title">{{ col.title }}</div>
        <div class="trayectoria-items">
          <div v-for="item in col.items" :key="item.id" class="trayectoria-item">
            <ImageSlot :src="item.logo" shape="circle" placeholder="Logo" class="trayectoria-logo" />
            <div class="trayectoria-item-body">
              <div class="trayectoria-item-title">{{ item.title }}</div>
              <div class="trayectoria-item-subtitle text-muted">{{ item.subtitle }}</div>
              <TagList :tags="item.tags" variant="outline" />
            </div>
          </div>
        </div>
      </BlueprintFrame>
    </div>
  </section>
</template>

<style scoped>
.trayectoria {
  padding: var(--space-8) var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}
.trayectoria-title {
  text-align: center;
  margin-bottom: var(--space-2);
}
.trayectoria-subtitle {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto var(--space-8);
}
.trayectoria-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.trayectoria-card {
  padding: var(--space-4);
}
.trayectoria-card-title {
  margin-bottom: var(--space-3);
}
.trayectoria-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.trayectoria-item {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  flex: 1 1 220px;
  min-width: 220px;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-divider);
}
.trayectoria-logo {
  width: 44px;
  height: 44px;
  flex: none;
}
.trayectoria-item-body {
  min-width: 0;
}
.trayectoria-item-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 15px;
}
.trayectoria-item-subtitle {
  font-size: 12px;
  margin-bottom: 6px;
}

@media (max-width: 900px) {
  .trayectoria-grid {
    grid-template-columns: 1fr;
  }
}
</style>
