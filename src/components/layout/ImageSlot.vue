<script setup lang="ts">
import { computed } from 'vue'
import { resolvePublicAsset } from '../../utils/assets'

// Production stand-in for the design mock's <image-slot>: renders the real
// image once one is set (frontmatter `image`, or a logo path), otherwise a
// dashed blueprint placeholder so the layout never breaks while assets are
// still missing. `src` is a path relative to public/ (e.g.
// images/projects/foo.jpg); it's resolved against the base URL here so the
// same value works locally and under the GitHub Pages subpath.
const props = withDefaults(
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

const resolvedSrc = computed(() => resolvePublicAsset(props.src))
</script>

<template>
  <div class="image-slot" :class="{ 'image-slot--circle': shape === 'circle' }">
    <img v-if="resolvedSrc" :src="resolvedSrc" :alt="alt" loading="lazy" />
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
