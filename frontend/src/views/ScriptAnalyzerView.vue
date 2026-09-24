<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { analyzeScript } from '../api/script'
import type { ScriptAnalysis, ScriptRequest } from '../api/script'
import BaseButton from '../components/BaseButton.vue'
import FormField from '../components/FormField.vue'
import PageHeader from '../components/PageHeader.vue'
import ResultPanel from '../components/ResultPanel.vue'

const form = reactive({ script: '' })
const errors = reactive({ script: '' })

const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')
/** Filled in after a successful request. */
const result = ref<ScriptAnalysis | null>(null)

/** The analysis fields, in the order they should be shown. */
const analysisFields: { key: keyof ScriptAnalysis; label: string }[] = [
  { key: 'summary', label: 'Summary' },
  { key: 'tone', label: 'Tone' },
  { key: 'emotion', label: 'Emotion' },
  { key: 'vocalDifficulty', label: 'Vocal difficulty' },
  { key: 'voiceDirection', label: 'Voice direction' },
  { key: 'workloadEstimate', label: 'Workload estimate' },
]

/** Counted in the browser - that is not AI work, so it does not need the backend. */
const characterCount = computed(() => form.script.length)
const wordCount = computed(() =>
  form.script.trim() === '' ? 0 : form.script.trim().split(/\s+/).length,
)

function handleClear() {
  form.script = ''
  errors.script = ''
  status.value = 'idle'
  errorMessage.value = ''
  result.value = null
}

async function handleSubmit() {
  errors.script = form.script.trim() === '' ? 'Paste a script before analyzing.' : ''

  if (errors.script !== '') {
    return
  }

  const request: ScriptRequest = { script: form.script.trim() }

  status.value = 'loading'
  errorMessage.value = ''
  result.value = null

  try {
    const response = await analyzeScript(request)
    result.value = response.analysis
    status.value = 'idle'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Something went wrong.'
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <PageHeader
      title="Script Analyzer"
      description="Paste a voice script and let CreatorFlow AI describe what the performance needs: the story, the tone and emotion, how hard it is vocally, who the voice should sound like, and how much work the job is."
    />

    <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
      <FormField
        id="script-text"
        label="Script text"
        hint="Paste the lines you were asked to record. Stage directions are fine to keep."
        :error="errors.script"
        :hint-right="`${wordCount} words · ${characterCount} characters`"
      >
        <textarea
          id="script-text"
          v-model="form.script"
          class="field-input font-mono"
          rows="12"
          placeholder="Paste your script here..."
          aria-describedby="script-text-hint"
          :aria-invalid="errors.script !== ''"
        ></textarea>
      </FormField>

      <div class="flex flex-wrap items-center gap-3">
        <BaseButton type="submit" :loading="status === 'loading'">Analyze script</BaseButton>
        <BaseButton
          type="button"
          variant="secondary"
          :disabled="form.script === ''"
          @click="handleClear"
        >
          Clear
        </BaseButton>
      </div>
    </form>

    <ResultPanel
      class="mt-8"
      title="Script analysis"
      :status="status"
      :error-message="errorMessage"
      loading-message="Analyzing the script..."
    >
      <dl v-if="result" class="space-y-3">
        <div
          v-for="field in analysisFields"
          :key="field.key"
          class="rounded-lg border border-slate-800 bg-slate-950/60 p-3"
        >
          <dt class="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {{ field.label }}
          </dt>
          <dd class="mt-1 text-sm leading-relaxed whitespace-pre-line text-slate-300">
            {{ result[field.key] }}
          </dd>
        </div>
      </dl>

      <template v-else>
        <p class="text-sm text-slate-400">Your AI result will appear here.</p>
        <p class="mt-2 text-xs leading-relaxed text-slate-500">
          Planned output: summary, tone, emotion, vocal difficulty, voice direction and a workload
          estimate.
        </p>
      </template>
    </ResultPanel>
  </div>
</template>
