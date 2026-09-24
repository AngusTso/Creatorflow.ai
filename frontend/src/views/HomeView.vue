<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'

/** Cards for the three tools. `path` values match the routes. */
const features: { path: string; title: string; description: string; badge?: string }[] = [
  {
    path: '/quote',
    title: 'Quote Assistant',
    description:
      'Describe a project. The AI estimates the hours, and a small calculator turns them into a transparent quote - the AI never guesses the numbers.',
  },
  {
    path: '/contract',
    title: 'Contract / TOS Assistant',
    description:
      'Turn your project and terms into a first draft of business terms, grounded in your own policy knowledge base.',
    badge: 'Coming soon',
  },
  {
    path: '/script',
    title: 'Script Analyzer',
    description:
      'Paste a voice script and get a structured read: summary, tone, emotion, vocal difficulty and voice direction.',
  },
]
</script>

<template>
  <div>
    <PageHeader
      title="CreatorFlow AI"
      description="A small set of free AI tools for client communication. Quote a project, check a voice script or draft your terms - you always review the final answer before a client sees it."
    />

    <ul class="grid gap-4 sm:grid-cols-3">
      <li v-for="feature in features" :key="feature.path">
        <RouterLink
          :to="feature.path"
          class="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-indigo-500/60 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          <h2 class="text-base font-semibold text-white">{{ feature.title }}</h2>
          <p
            v-if="feature.badge"
            class="mt-1 inline-block rounded-full border border-indigo-400/40 bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-200"
          >
            {{ feature.badge }}
          </p>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{{ feature.description }}</p>
          <span class="mt-4 text-sm font-medium text-indigo-300">Open tool &rarr;</span>
        </RouterLink>
      </li>
    </ul>

    <p class="mt-8 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-400">
      <span class="font-semibold text-slate-300">Status:</span> the Quote Assistant and Script Analyzer are
      live - each one calls a small serverless function that talks to an AI model. The Contract / TOS
      assistant is still being built, so its page tells you that instead of inventing terms.
    </p>
  </div>
</template>
