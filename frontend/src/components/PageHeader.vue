<script setup lang="ts">
defineProps<{
  /** Page title, rendered inside the main <h1>. Wrap words in a
   *  `<em>` slot content to set them in the italic display face. */
  title: string
  /** One or two sentences that explain what the page does. Can be replaced
   *  entirely with the default slot. */
  description?: string
  /** Small all-caps label above the title. */
  eyebrow?: string
}>()
</script>

<template>
  <header class="mb-10 sm:mb-12">
    <p v-if="eyebrow" class="eyebrow mb-4">
      <span class="inline-block size-1.5 rounded-full bg-clay" aria-hidden="true"></span>
      {{ eyebrow }}
    </p>

    <h1 class="font-display text-[2.15rem] leading-[1.05] font-black tracking-[-0.02em] text-forest sm:text-[2.9rem]">
      <slot name="title">{{ title }}</slot>
    </h1>

    <div class="mt-4 h-[3px] w-14 -rotate-[0.7deg] rounded-full bg-clay/80" aria-hidden="true"></div>

    <p v-if="description" class="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-forest/70">
      {{ description }}
    </p>

    <slot />
  </header>
</template>
