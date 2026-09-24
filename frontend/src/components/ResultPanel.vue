<script setup lang="ts">
/**
 * Shared result area: shows the empty placeholder from the default slot,
 * a spinner while loading, or an error card.
 */
defineProps<{
  title: string
  status: 'idle' | 'loading' | 'error'
  errorMessage?: string
  loadingMessage?: string
}>()
</script>

<template>
  <section
    class="rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6"
    aria-live="polite"
    :aria-busy="status === 'loading'"
  >
    <h2 class="text-xs font-semibold tracking-wide text-slate-400 uppercase">{{ title }}</h2>

    <div v-if="status === 'loading'" class="mt-4 flex items-center gap-3 text-sm text-slate-300">
      <span
        class="size-4 shrink-0 animate-spin rounded-full border-2 border-slate-500 border-t-transparent"
        aria-hidden="true"
      ></span>
      <span>{{ loadingMessage ?? 'Working on it...' }}</span>
    </div>

    <div
      v-else-if="status === 'error'"
      class="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-4"
      role="alert"
    >
      <p class="text-sm font-semibold text-rose-200">Something went wrong</p>
      <p class="mt-1 text-sm leading-relaxed text-rose-100/90">{{ errorMessage }}</p>
    </div>

    <div v-else class="mt-4">
      <slot />
    </div>
  </section>
</template>
