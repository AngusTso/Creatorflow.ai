import { API_READY, ApiError, postJson } from './client'

/** Body sent to `POST /api/script/analyze`. */
export interface ScriptRequest {
  script: string
}

/** Structured analysis the backend will return. */
export interface ScriptAnalysis {
  summary: string
  tone: string
  emotion: string
  vocalDifficulty: string
  voiceDirection: string
  workloadEstimate: string
}

/**
 * Shape the backend will return for `POST /api/script/analyze`.
 * Nothing renders it yet: the AI analysis is a later step.
 */
export interface ScriptAnalyzeResponse {
  analysis: ScriptAnalysis
  wordCount: number
  characterCount: number
}

/** Asks the backend to analyze a voice-acting script. */
export async function analyzeScript(request: ScriptRequest): Promise<ScriptAnalyzeResponse> {
  if (!API_READY) {
    throw new ApiError('API not implemented yet: POST /api/script/analyze')
  }

  return postJson<ScriptAnalyzeResponse>('/script/analyze', request)
}
