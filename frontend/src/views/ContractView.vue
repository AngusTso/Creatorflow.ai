<script setup lang="ts">
import { reactive, ref } from 'vue'
import { generateContract } from '../api/contract'
import type { ContractRequest } from '../api/contract'
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

  try {
    // The backend is not connected yet, so this always throws for now.
    await generateContract(request)
    // The draft will be rendered here once the RAG step exists.
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
      title="Contract / TOS Assistant"
      description="Describe the project and your usual terms. CreatorFlow AI drafts business terms from your own policy knowledge base so the wording stays consistent between clients."
    />

    <p
      class="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100/90"
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
      <p class="text-sm text-slate-400">Your AI result will appear here.</p>
      <p class="mt-2 text-xs leading-relaxed text-slate-500">
        Planned output: a draft covering scope, payment, revisions, cancellation and delivery, with the
        policy sections it was based on.
      </p>
    </ResultPanel>
  </div>
</template>
