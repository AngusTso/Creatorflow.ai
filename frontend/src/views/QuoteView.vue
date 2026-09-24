<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CURRENCIES, analyzeQuote } from '../api/quote'
import type { Currency, QuoteRequest } from '../api/quote'
import BaseButton from '../components/BaseButton.vue'
import FormField from '../components/FormField.vue'
import PageHeader from '../components/PageHeader.vue'
import ResultPanel from '../components/ResultPanel.vue'

const form = reactive({
  projectDescription: '',
  currency: 'USD' as Currency,
  /** Kept as a string because it is bound to a text/number input. */
  hourlyRate: '',
})

const errors = reactive({
  projectDescription: '',
  hourlyRate: '',
})

const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')

function validate(): boolean {
  errors.projectDescription =
    form.projectDescription.trim() === '' ? 'Describe your project before generating a quote.' : ''

  const rawRate = form.hourlyRate.trim()
  errors.hourlyRate =
    rawRate !== '' && !(Number(rawRate) > 0) ? 'Use a positive number, or leave this empty.' : ''

  return errors.projectDescription === '' && errors.hourlyRate === ''
}

async function handleSubmit() {
  if (!validate()) {
    return
  }

  const request: QuoteRequest = {
    projectDescription: form.projectDescription.trim(),
    currency: form.currency,
    hourlyRate: form.hourlyRate.trim() === '' ? undefined : Number(form.hourlyRate),
  }

  status.value = 'loading'
  errorMessage.value = ''

  try {
    // The backend is not connected yet, so this always throws for now.
    await analyzeQuote(request)
    // The estimate will be rendered here once the Python calculator exists.
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
      title="Quote Assistant"
      description="Describe the project in your own words. CreatorFlow AI extracts the requirements first, and a deterministic Python calculator turns them into an estimate - no guesswork, the maths is code."
    />

    <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
      <FormField
        id="quote-project"
        label="Describe your project"
        hint="What is the job, how long is it, and anything the client asked for. Plain language is fine."
        :error="errors.projectDescription"
      >
        <textarea
          id="quote-project"
          v-model="form.projectDescription"
          class="field-input"
          rows="8"
          placeholder="Describe your project..."
          aria-describedby="quote-project-hint"
          :aria-invalid="errors.projectDescription !== ''"
        ></textarea>
      </FormField>

      <div class="grid gap-6 sm:grid-cols-2">
        <FormField id="quote-currency" label="Currency" hint="Optional - defaults to USD.">
          <select id="quote-currency" v-model="form.currency" class="field-input">
            <option v-for="currency in CURRENCIES" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </FormField>

        <FormField
          id="quote-rate"
          label="Your hourly rate"
          hint="Optional - leave empty to let the backend use its own default."
          :error="errors.hourlyRate"
        >
          <input
            id="quote-rate"
            v-model="form.hourlyRate"
            class="field-input"
            type="number"
            min="1"
            step="1"
            inputmode="decimal"
            placeholder="e.g. 500"
            :aria-invalid="errors.hourlyRate !== ''"
          />
        </FormField>
      </div>

      <BaseButton type="submit" :loading="status === 'loading'">Generate quote</BaseButton>
    </form>

    <ResultPanel
      class="mt-8"
      title="Quote estimate"
      :status="status"
      :error-message="errorMessage"
      loading-message="Reading your project description..."
    >
      <p class="text-sm text-slate-400">Your AI result will appear here.</p>
      <p class="mt-2 text-xs leading-relaxed text-slate-500">
        Planned output: extracted requirements, estimated hours and the calculated total with a short
        breakdown.
      </p>
    </ResultPanel>
  </div>
</template>
