<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { analyzeScript } from "../api/script";
import type { ScriptRequest, ScriptAnalysis } from "../api/script";
import BaseButton from "../components/BaseButton.vue";
import FormField from "../components/FormField.vue";
import PageHeader from "../components/PageHeader.vue";
import ResultPanel from "../components/ResultPanel.vue";

const form = reactive({ script: "" });
const errors = reactive({ script: "" });
const result: ScriptAnalysis = reactive({
  summary: "",
  tone: "",
  emotion: "",
  vocalDifficulty: "",
  voiceDirection: "",
  workloadEstimate: "",
});
const status = ref<"idle" | "loading" | "error">("idle");
const errorMessage = ref("");

/** Counted in the browser - that is not AI work, so it does not need the backend. */
const characterCount = computed(() => form.script.length);
const wordCount = computed(() =>
  form.script.trim() === "" ? 0 : form.script.trim().split(/\s+/).length,
);

function handleClear() {
  form.script = "";
  errors.script = "";
  status.value = "idle";
  errorMessage.value = "";
}

async function handleSubmit() {
  errors.script =
    form.script.trim() === "" ? "Paste a script before analyzing." : "";

  if (errors.script !== "") {
    return;
  }

  const request: ScriptRequest = { script: form.script.trim() };

  status.value = "loading";
  errorMessage.value = "";

  try {
    // The backend is not connected yet, so this always throws for now.
    Object.assign(result, await analyzeScript(request));
    // The analysis will be rendered here once the AI step exists.
    status.value = "idle";
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Something went wrong.";
    status.value = "error";
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
        <BaseButton type="submit" :loading="status === 'loading'"
          >Analyze script</BaseButton
        >
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
      <p class="text-sm text-slate-400">{{ result }}</p>
      <p class="mt-2 text-xs leading-relaxed text-slate-500">
        Planned output: summary, tone, emotion, vocal difficulty, voice
        direction and a workload estimate.
      </p>
    </ResultPanel>
  </div>
</template>
