import { API_READY, ApiError, postJson } from "./client";

/** Body sent to `POST /api/script/contract`. */
export interface ContractRequest {
  projectDescription: string;
  paymentTerms: string;
  revisionTerms: string;
  cancellationTerms: string;
  deliveryTerms: string;
}

/** One generated term in the contract draft. */
export interface ContractTerm {
  heading: string
  content: string
}

/** A policy reference used to ground the generated draft. */
export interface ContractSource {
  source: string
  section: string
  score: number
}

/** Shape returned by `POST /api/script/contract` (`api/script/contract.ts`). */
export interface ContractDraft {
  terms: {
    title: string
    summary: string
    terms: ContractTerm[]
    missingInformation: string[]
    disclaimer: string
  }
  sources: ContractSource[]
}

/** Asks the backend to draft business terms for a project. */
export async function generateContract(
  request: ContractRequest,
): Promise<ContractDraft> {
  if (!API_READY) {
    throw new ApiError(
      "The API layer is switched off (API_READY is false in src/api/client.ts).",
    );
  }

  return postJson<ContractDraft>("/script/contract", request)
}
