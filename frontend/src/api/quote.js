import { API_READY, ApiError, postJson } from './client';
export const CURRENCIES = ['USD', 'HKD', 'JPY'];
/** Asks the backend to extract requirements and calculate a quote. */
export async function analyzeQuote(request) {
    if (!API_READY) {
        throw new ApiError('API not implemented yet: POST /api/quote');
    }
    return postJson('/quote', request);
}
