<script setup lang="ts">
defineProps<{
  /** Page title, rendered as the main <h1>. */
  title: string
  /** One or two sentences that explain what the page does. */
  description: string
}>()
</script>

<template>
  <div class="mb-6 sm:mb-8">
    <h1 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{{ title }}</h1>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{{ description }}</p>
    <slot />
  </div>
</template>
