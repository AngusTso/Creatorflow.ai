import { API_READY, ApiError, postJson } from './client'

/** Currencies the quote form offers. */
export type Currency = 'USD' | 'HKD' | 'JPY'

export const CURRENCIES: readonly Currency[] = ['USD', 'HKD', 'JPY']

/** Body sent to `POST /api/quote`. */
export interface QuoteRequest {
  projectDescription: string
  currency: Currency
  /** Optional - when left out the backend uses its own default rate. */
  hourlyRate?: number
}

/**
 * Shape the backend will return for `POST /api/quote`.
 * Nothing renders it yet: the Python estimate calculator is a later step.
 */
export interface QuoteEstimate {
  currency: Currency
  hourlyRate: number
  hours: number
  total: number
  summary: string
}

/** Asks the backend to extract requirements and calculate a quote. */
export async function analyzeQuote(request: QuoteRequest): Promise<QuoteEstimate> {
  if (!API_READY) {
    throw new ApiError('API not implemented yet: POST /api/quote')
  }

  return postJson<QuoteEstimate>('/quote', request)
}
