<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Page not found"
      description="That page does not exist (yet). Pick one of the three tools to keep going."
    />

    <ul class="flex flex-wrap gap-3 text-sm font-medium">
      <li>
        <RouterLink
          to="/quote"
          class="inline-block rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Quote Assistant
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/contract"
          class="inline-block rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Contract / TOS Assistant
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/script"
          class="inline-block rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Script Analyzer
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
