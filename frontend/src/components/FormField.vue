<script setup lang="ts">
defineProps<{
  /** Id of the input/textarea/select in the slot (keeps the label clickable). */
  id: string
  label: string
  /** Short explanation under the label. Point the control at `id-hint` with
   *  `aria-describedby`. */
  hint?: string
  /** Validation message under the control. Rendered as a live alert. */
  error?: string
  /** Small text in the top right corner, e.g. a word counter. */
  hintRight?: string
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-baseline justify-between gap-4">
      <label :for="id" class="text-sm font-medium text-slate-200">{{ label }}</label>
      <span v-if="hintRight" class="text-xs whitespace-nowrap text-slate-500">{{ hintRight }}</span>
    </div>

    <p v-if="hint" :id="`${id}-hint`" class="text-xs leading-relaxed text-slate-400">{{ hint }}</p>

    <slot />

    <p v-if="error" :id="`${id}-error`" class="text-xs font-medium text-rose-300" role="alert">
      {{ error }}
    </p>
  </div>
</template>
