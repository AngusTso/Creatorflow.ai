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
    class="rounded-lg border border-forest/15 bg-paper p-6 shadow-[0_1px_0_rgba(46,59,41,0.06)] sm:p-7"
    aria-live="polite"
    :aria-busy="status === 'loading'"
  >
    <h2 class="eyebrow text-forest/55">
      <span class="inline-block size-1.5 rounded-full bg-sage" aria-hidden="true"></span>
      {{ title }}
    </h2>

    <div v-if="status === 'loading'" class="mt-5 flex items-center gap-3 text-sm text-forest/70">
      <span
        class="size-4 shrink-0 animate-spin rounded-full border-2 border-forest/25 border-t-clay"
        aria-hidden="true"
      ></span>
      <span>{{ loadingMessage ?? 'Working on it...' }}</span>
    </div>

    <div
      v-else-if="status === 'error'"
      class="mt-5 rounded-md border-l-[3px] border-clay bg-clay/10 p-4"
      role="alert"
    >
      <p class="font-display text-base font-bold text-rust italic">Something went wrong</p>
      <p class="mt-1 text-sm leading-relaxed text-forest/80">{{ errorMessage }}</p>
    </div>

    <div v-else class="mt-5">
      <slot />
    </div>
  </section>
</template>
