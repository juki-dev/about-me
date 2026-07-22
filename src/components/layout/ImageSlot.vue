<script setup lang="ts">
// Production stand-in for the design mock's <image-slot>: renders the real
// image once one is set (frontmatter `image`, or a logo path), otherwise a
// dashed blueprint placeholder so the layout never breaks while assets are
// still missing.
withDefaults(
  defineProps<{
    src?: string | null
    alt?: string
    placeholder?: string
    shape?: 'circle' | 'rect'
  }>(),
  {
    src: null,
    alt: '',
    placeholder: 'Imagen',
    shape: 'rect',
  },
)
</script>

<template>
  <div class="image-slot" :class="{ 'image-slot--circle': shape === 'circle' }">
    <img v-if="src" :src="src" :alt="alt" loading="lazy" />
    <span v-else>{{ placeholder }}</span>
  </div>
</template>

<style scoped>
.image-slot--circle {
  border-radius: 50%;
}
.image-slot--circle img {
  border-radius: 50%;
}
</style>
