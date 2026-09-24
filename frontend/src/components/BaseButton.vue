<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** `submit` by default so the button works inside a form. */
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary'
    /** Shows a spinner and blocks a second click. */
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'submit',
    variant: 'primary',
    loading: false,
    disabled: false,
  },
)

const variantClasses: Record<'primary' | 'secondary', string> = {
  primary:
    'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-400 disabled:bg-slate-700 disabled:text-slate-400',
  secondary:
    'border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white focus-visible:outline-slate-400 disabled:text-slate-500',
}

const classes = computed(() => variantClasses[props.variant])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
    :class="classes"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    ></span>
    <slot />
  </button>
</template>
