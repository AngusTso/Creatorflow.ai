import { API_READY, ApiError, postJson } from './client'

/** Body sent to `POST /api/contract`. */
export interface ContractRequest {
  projectDescription: string
  paymentTerms: string
  revisionTerms: string
  cancellationTerms: string
  deliveryTerms: string
}

/**
 * Shape the backend will return for `POST /api/contract`.
 * The draft is plain text that the page will show once the RAG step exists.
 */
export interface ContractDraft {
  terms: string
  disclaimer: string
}

/** Asks the backend to draft business terms for a project. */
export async function generateContract(request: ContractRequest): Promise<ContractDraft> {
  if (!API_READY) {
    throw new ApiError('API not implemented yet: POST /api/contract')
  }

  return postJson<ContractDraft>('/contract', request)
}
