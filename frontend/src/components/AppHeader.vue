<script setup lang="ts">
import { RouterLink } from 'vue-router'

/** The three MVP features. `name` values match the route names in `router.ts`. */
const links: { name: 'quote' | 'contract' | 'script'; label: string }[] = [
  { name: 'quote', label: 'Quote' },
  { name: 'contract', label: 'Contract / TOS' },
  { name: 'script', label: 'Script Analyzer' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
    <div
      class="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
      >
        <span
          class="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white"
          aria-hidden="true"
        >
          CF
        </span>
        <span class="leading-tight">
          <span class="block text-sm font-semibold text-white">CreatorFlow AI</span>
          <span class="block text-xs text-slate-400">Client communication assistant</span>
        </span>
      </RouterLink>

      <nav aria-label="Main" class="-mx-1 flex flex-wrap gap-1">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="{ name: link.name }"
          class="rounded-md px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
