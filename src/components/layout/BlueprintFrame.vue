<script setup lang="ts">
// The "Industry" wireframe frame: a hairline border plus four "+"
// registration marks at the corners. Wraps any block-level content.
withDefaults(
  defineProps<{
    tag?: string
  }>(),
  { tag: 'div' },
)
</script>

<template>
  <component :is="tag" class="blueprint">
    <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
    <slot />
  </component>
</template>
