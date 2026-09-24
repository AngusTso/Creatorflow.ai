import { API_READY, ApiError, postJson } from './client';
/** Asks the backend to analyze a voice-acting script. */
export async function analyzeScript(request) {
    if (!API_READY) {
        throw new ApiError('API not implemented yet: POST /api/script/analyze');
    }
    return postJson('/script/analyze', request);
}
