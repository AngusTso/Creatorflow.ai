<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'

const tools: { path: string; label: string }[] = [
  { path: '/quote', label: 'Quote Assistant' },
  { path: '/contract', label: 'Contract / TOS Assistant' },
  { path: '/script', label: 'Script Analyzer' },
]
</script>

<template>
  <div>
    <PageHeader eyebrow="404" title="Page not found">
      <template #title>Page <em class="text-rust">not found</em></template>
      <template #default>
        <p class="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-forest/70">
          That page does not exist (yet). Pick one of the three tools to keep going.
        </p>
      </template>
    </PageHeader>

    <ul class="max-w-2xl">
      <li v-for="tool in tools" :key="tool.path">
        <RouterLink
          :to="tool.path"
          class="group flex items-baseline justify-between gap-4 border-b border-forest/15 py-4 font-display text-xl font-bold text-forest transition-colors hover:text-rust focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust/50 sm:text-2xl"
        >
          {{ tool.label }}
          <span class="text-base text-clay transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
