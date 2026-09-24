import { API_READY, ApiError, postJson } from './client';
/** Asks the backend to draft business terms for a project. */
export async function generateContract(request) {
    if (!API_READY) {
        throw new ApiError('API not implemented yet: POST /api/contract');
    }
    return postJson('/contract', request);
}
