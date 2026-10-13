<script setup lang="ts">
import { reactive, ref } from 'vue'
import { generateContract } from '../api/contract'
import type { ContractDraft, ContractRequest } from '../api/contract'
import BaseButton from '../components/BaseButton.vue'
import FormField from '../components/FormField.vue'
import PageHeader from '../components/PageHeader.vue'
import ResultPanel from '../components/ResultPanel.vue'

/** Shown on the page and repeated in the generated draft. */
const disclaimer =
  'Generated business terms are for drafting purposes and are not legal advice.'

const form = reactive<ContractRequest>({
  projectDescription: '',
  paymentTerms: '',
  revisionTerms: '',
  cancellationTerms: '',
  deliveryTerms: '',
})

const errors = reactive({ projectDescription: '' })

const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')
const result = ref<ContractDraft | null>(null)

async function handleSubmit() {
  errors.projectDescription =
    form.projectDescription.trim() === ''
      ? 'Describe the project before generating terms.'
      : ''

  if (errors.projectDescription !== '') {
    return
  }

  const request: ContractRequest = {
    projectDescription: form.projectDescription.trim(),
    paymentTerms: form.paymentTerms.trim(),
    revisionTerms: form.revisionTerms.trim(),
    cancellationTerms: form.cancellationTerms.trim(),
    deliveryTerms: form.deliveryTerms.trim(),
  }

  status.value = 'loading'
  errorMessage.value = ''
  result.value = null

  try {
    result.value = await generateContract(request)
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
      eyebrow="Tool 02"
      title="Contract / TOS Assistant"
      description="Describe the project and your usual terms. CreatorFlow AI drafts business terms from your own policy knowledge base so the wording stays consistent between clients."
    >
      <template #title>Contract / TOS <em class="text-rust">Assistant</em></template>
    </PageHeader>

    <p
      class="mb-4 border-l-[3px] border-clay bg-clay/10 p-4 text-xs leading-relaxed text-forest/80"
      role="note"
    >
      {{ disclaimer }}
    </p>

    <form class="space-y-6" novalidate @submit.prevent="handleSubmit">
      <FormField
        id="contract-project"
        label="Project description"
        hint="Deliverable, scope, deadline and anything in between."
        :error="errors.projectDescription"
      >
        <textarea
          id="contract-project"
          v-model="form.projectDescription"
          class="field-input"
          rows="6"
          placeholder="Describe your project..."
          aria-describedby="contract-project-hint"
          :aria-invalid="errors.projectDescription !== ''"
        ></textarea>
      </FormField>

      <FormField
        id="contract-payment"
        label="Payment terms"
        hint="For example: 50% deposit, balance on delivery."
      >
        <input
          id="contract-payment"
          v-model="form.paymentTerms"
          class="field-input"
          type="text"
          placeholder="e.g. 50% deposit, 50% on delivery"
          aria-describedby="contract-payment-hint"
        />
      </FormField>

      <FormField
        id="contract-revisions"
        label="Revision terms"
        hint="How many rounds are included, and what counts as a revision."
      >
        <input
          id="contract-revisions"
          v-model="form.revisionTerms"
          class="field-input"
          type="text"
          placeholder="e.g. 2 rounds included, extra rounds billed hourly"
          aria-describedby="contract-revisions-hint"
        />
      </FormField>

      <FormField
        id="contract-cancellation"
        label="Cancellation terms"
        hint="Notice period and what happens to work already done."
      >
        <input
          id="contract-cancellation"
          v-model="form.cancellationTerms"
          class="field-input"
          type="text"
          placeholder="e.g. 7 days notice, deposit is non-refundable"
          aria-describedby="contract-cancellation-hint"
        />
      </FormField>

      <FormField
        id="contract-delivery"
        label="Delivery terms"
        hint="File formats, delivery method and how long the files stay available."
      >
        <input
          id="contract-delivery"
          v-model="form.deliveryTerms"
          class="field-input"
          type="text"
          placeholder="e.g. WAV + MP3 by WeTransfer, kept for 30 days"
          aria-describedby="contract-delivery-hint"
        />
      </FormField>

      <BaseButton type="submit" :loading="status === 'loading'">Generate terms</BaseButton>
    </form>

    <ResultPanel
      class="mt-8"
      title="Business terms draft"
      :status="status"
      :error-message="errorMessage"
      loading-message="Drafting the terms from your policy knowledge base..."
    >
      <template v-if="result">
        <h3 class="font-display text-2xl font-bold text-forest">{{ result.terms.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed whitespace-pre-line text-forest/85">
          {{ result.terms.summary }}
        </p>

        <dl class="mt-6 space-y-5">
          <div
            v-for="(term, index) in result.terms.terms"
            :key="`${index}-${term.heading}`"
            class="border-l-[3px] pl-4"
            :class="index % 2 === 0 ? 'border-clay/70' : 'border-sage'"
          >
            <dt class="font-display text-base font-bold text-forest">{{ term.heading }}</dt>
            <dd class="mt-1 text-sm leading-relaxed whitespace-pre-line text-forest/85">
              {{ term.content }}
            </dd>
          </div>
        </dl>

        <div v-if="result.terms.missingInformation.length > 0" class="mt-6">
          <h4 class="eyebrow text-forest/55">Details to confirm</h4>
          <ul class="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-forest/85">
            <li v-for="item in result.terms.missingInformation" :key="item">{{ item }}</li>
          </ul>
        </div>

        <p class="mt-6 border-t border-forest/15 pt-4 text-xs leading-relaxed text-forest/60">
          {{ result.terms.disclaimer }}
        </p>

        <div v-if="result.sources.length > 0" class="mt-6">
          <h4 class="eyebrow text-forest/55">Policy sources</h4>
          <ul class="mt-2 space-y-1 text-xs leading-relaxed text-forest/60">
            <li v-for="source in result.sources" :key="`${source.source}-${source.section}`">
              {{ source.source }} · {{ source.section }}
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <p class="font-display text-lg font-bold text-forest/80 italic">Your result will appear here.</p>
        <p class="mt-2 text-xs leading-relaxed text-forest/60">
          Generate a policy-grounded draft with the project details, missing information and policy
          sections it was based on.
        </p>
      </template>
    </ResultPanel>
  </div>
</template>
