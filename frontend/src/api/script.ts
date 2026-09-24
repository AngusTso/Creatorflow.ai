import { API_READY, ApiError, postJson } from './client'

/** Body sent to `POST /api/script/analyze`. */
export interface ScriptRequest {
  script: string
}

/** Structured analysis the AI returns for a script. */
export interface ScriptAnalysis {
  summary: string
  tone: string
  emotion: string
  vocalDifficulty: string
  voiceDirection: string
  workloadEstimate: string
}

/** Shape returned by `POST /api/script/analyze` (see `api/script/analyze.ts`). */
export interface ScriptAnalyzeResponse {
  analysis: ScriptAnalysis
  wordCount: number
  characterCount: number
}

/** Asks the backend to analyze a voice-acting script. */
export async function analyzeScript(request: ScriptRequest): Promise<ScriptAnalyzeResponse> {
  if (!API_READY) {
    throw new ApiError('The API layer is switched off (API_READY is false in src/api/client.ts).')
  }

  return postJson<ScriptAnalyzeResponse>('/script/analyze', request)
}
