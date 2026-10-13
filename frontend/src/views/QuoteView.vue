<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CURRENCIES, analyzeQuote } from '../api/quote'
import type { Currency, QuoteEstimate, QuoteRequest } from '../api/quote'
import BaseButton from '../components/BaseButton.vue'
import FormField from '../components/FormField.vue'
import PageHeader from '../components/PageHeader.vue'
import ResultPanel from '../components/ResultPanel.vue'

const form = reactive({
  projectDescription: '',
  currency: 'USD' as Currency,
  /**
   * Vue's `v-model` writes a real number for `<input type="number">` and `''`
   * when the field is empty, so both are allowed here.
   */
  hourlyRate: '' as number | '',
})

const errors = reactive({
  projectDescription: '',
  hourlyRate: '',
})

const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')
/** Filled in after a successful request. */
const result = ref<QuoteEstimate | null>(null)

function validate(): boolean {
  errors.projectDescription =
    form.projectDescription.trim() === '' ? 'Describe your project before generating a quote.' : ''

  const rawRate = form.hourlyRate
  errors.hourlyRate =
    rawRate !== '' && !(rawRate > 0) ? 'Use a positive number, or leave this empty.' : ''

  return errors.projectDescription === '' && errors.hourlyRate === ''
}

/** Formats an amount with the currency the backend answered with. */
function formatMoney(value: number): string {
  const currency = result.value?.currency

  if (currency === undefined || !CURRENCIES.includes(currency)) {
    return value.toLocaleString('en-US')
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)
}

async function handleSubmit() {
  if (!validate()) {
    return
  }

  const request: QuoteRequest = {
    projectDescription: form.projectDescription.trim(),
    currency: form.currency,
    // Left out entirely when the field is empty, so the backend uses its default.
    hourlyRate: form.hourlyRate === '' ? undefined : form.hourlyRate,
  }

  status.value = 'loading'
  errorMessage.value = ''
  result.value = null

  try {
    result.value = await analyzeQuote(request)
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
      eyebrow="Tool 01"
      title="Quote Assistant"
      description="Describe the project in your own words. The AI estimates the hours, then a small calculator does the arithmetic - the AI never guesses the final price."
    >
      <template #title>Quote <em class="text-rust">Assistant</em></template>
    </PageHeader>

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
            v-model.number="form.hourlyRate"
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
      <template v-if="result">
        <p class="font-display text-[2.6rem] leading-none font-black tracking-tight text-rust">
          {{ formatMoney(result.total) }}
        </p>
        <p class="mt-2 text-xs text-forest/60">Total for the estimated {{ result.hours }} hours</p>

        <dl class="mt-6 grid divide-y divide-forest/15 border-y border-forest/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div class="py-3.5 sm:px-4 sm:first:pl-0">
            <dt class="text-[0.66rem] font-bold tracking-[0.18em] text-forest/55 uppercase">Currency</dt>
            <dd class="mt-1 font-display text-lg font-bold text-forest">{{ result.currency }}</dd>
          </div>
          <div class="py-3.5 sm:px-4">
            <dt class="text-[0.66rem] font-bold tracking-[0.18em] text-forest/55 uppercase">Hourly rate</dt>
            <dd class="mt-1 font-display text-lg font-bold text-forest">{{ formatMoney(result.hourlyRate) }}</dd>
          </div>
          <div class="py-3.5 sm:px-4">
            <dt class="text-[0.66rem] font-bold tracking-[0.18em] text-forest/55 uppercase">Estimated hours</dt>
            <dd class="mt-1 font-display text-lg font-bold text-forest">{{ result.hours }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <h3 class="eyebrow text-forest/55">
            <span class="inline-block size-1.5 rounded-full bg-sage" aria-hidden="true"></span>
            Summary
          </h3>
          <p class="mt-2 text-sm leading-relaxed whitespace-pre-line text-forest/85">
            {{ result.summary }}
          </p>
        </div>
      </template>

      <template v-else>
        <p class="font-display text-lg font-bold text-forest/80 italic">Your result will appear here.</p>
        <p class="mt-2 text-xs leading-relaxed text-forest/60">
          You will get the estimated hours, your hourly rate, the currency and the calculated total, plus a
          short AI summary you can paste into your reply.
        </p>
      </template>
    </ResultPanel>
  </div>
</template>
