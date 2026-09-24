<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'

/** Cards for the three MVP features. `path` values match the routes. */
const features = [
  {
    path: '/quote',
    title: 'Quote Assistant',
    description:
      'Describe a project. The AI pulls out the requirements and a small Python calculator turns them into a transparent estimate.',
  },
  {
    path: '/contract',
    title: 'Contract / TOS Assistant',
    description:
      'Turn your project and terms into a first draft of business terms, grounded in your own policy knowledge base.',
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
      description="A small AI assistant for client communication. Three tools that help creators answer client questions faster, while you stay in control of the final answer."
    />

    <ul class="grid gap-4 sm:grid-cols-3">
      <li v-for="feature in features" :key="feature.path">
        <RouterLink
          :to="feature.path"
          class="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-indigo-500/60 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          <h2 class="text-base font-semibold text-white">{{ feature.title }}</h2>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{{ feature.description }}</p>
          <span class="mt-4 text-sm font-medium text-indigo-300">Open tool &rarr;</span>
        </RouterLink>
      </li>
    </ul>

    <p class="mt-8 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-400">
      <span class="font-semibold text-slate-300">Status:</span> this is the frontend step of the project.
      The pages are wired to a small API module (<code class="text-slate-300">src/api</code>), but the Python
      backend is not connected yet, so each tool answers with an
      <span class="text-slate-300">"API not implemented yet"</span> message instead of a fake result.
    </p>
  </div>
</template>
