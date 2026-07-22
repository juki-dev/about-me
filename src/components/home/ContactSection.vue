<script setup lang="ts">
import BlueprintFrame from '../layout/BlueprintFrame.vue'
import { profile } from '../../data/profile'
</script>

<template>
  <section id="contact" class="contact">
    <h2>Contact</h2>
    <p class="contact-copy text-muted">¿Tienes un proyecto de IoT o desarrollo full-stack en mente? Hablemos.</p>
    <div class="contact-actions">
      <BlueprintFrame tag="a" class="btn btn-primary" :href="`mailto:${profile.email}`">
        Escribir un correo
      </BlueprintFrame>
      <a class="btn btn-secondary blueprint" :href="profile.linkedinUrl" target="_blank" rel="noreferrer">
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        LinkedIn
      </a>
      <a class="btn btn-secondary blueprint" :href="profile.githubUrl" target="_blank" rel="noreferrer">
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        GitHub
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: var(--space-8) var(--space-4);
  text-align: center;
}
.contact h2 {
  margin-bottom: var(--space-2);
}
.contact-copy {
  max-width: 50ch;
  margin: 0 auto var(--space-4);
}
.contact-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}
</style>
