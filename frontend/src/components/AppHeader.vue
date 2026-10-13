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
  <header class="sticky top-0 z-40 border-b border-forest/15 bg-cream">
    <div
      class="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8"
    >
      <RouterLink
        :to="{ name: 'home' }"
        class="group flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust/50"
      >
        <span
          class="grid size-11 shrink-0 -rotate-3 place-items-center rounded-[13px] bg-clay font-display text-xl font-black text-cream transition-transform duration-300 group-hover:rotate-0"
          aria-hidden="true"
        >
          Cf
        </span>
        <span class="leading-tight">
          <span class="block font-display text-xl font-black tracking-tight text-forest">
            CreatorFlow <em class="text-rust">AI</em>
          </span>
          <span class="mt-0.5 block text-[0.65rem] font-bold tracking-[0.18em] text-forest/55 uppercase">
            Client communication assistant
          </span>
        </span>
      </RouterLink>

      <nav aria-label="Main" class="-mx-2 flex flex-wrap gap-x-5 gap-y-1">
        <RouterLink v-for="link in links" :key="link.name" :to="{ name: link.name }" class="nav-link">
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
