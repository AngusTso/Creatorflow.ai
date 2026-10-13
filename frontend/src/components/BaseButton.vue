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
    'bg-rust text-cream hover:bg-[#8d3d20] focus-visible:outline-rust/60 disabled:bg-forest/20 disabled:text-forest/45',
  secondary:
    'border border-forest/30 bg-transparent text-forest hover:border-forest/70 hover:bg-forest/5 focus-visible:outline-forest/50 disabled:text-forest/40',
}

const classes = computed(() => variantClasses[props.variant])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    class="inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-2.5 text-sm font-bold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed"
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
