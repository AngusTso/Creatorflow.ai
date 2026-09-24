import { API_READY, ApiError, postJson } from './client'

/** Body sent to `POST /api/contract`. */
export interface ContractRequest {
  projectDescription: string
  paymentTerms: string
  revisionTerms: string
  cancellationTerms: string
  deliveryTerms: string
}

/** Shape `POST /api/contract` will return once the endpoint exists. */
export interface ContractDraft {
  terms: string
  disclaimer: string
}

/**
 * The terms endpoint is not built yet (`api/contract.ts` does not exist), so the
 * page answers with a clear "coming soon" message instead of a confusing 404.
 * Flip this to `true` in the lesson that adds the endpoint.
 */
const CONTRACT_ENDPOINT_READY = false

/** Asks the backend to draft business terms for a project. */
export async function generateContract(request: ContractRequest): Promise<ContractDraft> {
  if (!API_READY) {
    throw new ApiError('The API layer is switched off (API_READY is false in src/api/client.ts).')
  }

  if (!CONTRACT_ENDPOINT_READY) {
    throw new ApiError(
      'The Contract / TOS assistant is coming soon. The endpoint POST /api/contract is not built yet.',
    )
  }

  return postJson<ContractDraft>('/contract', request)
}
