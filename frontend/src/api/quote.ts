import { API_READY, ApiError, postJson } from './client'

/** Currencies the quote form offers. */
export type Currency = 'USD' | 'HKD' | 'JPY'

export const CURRENCIES: readonly Currency[] = ['USD', 'HKD', 'JPY']

/** Body sent to `POST /api/script/quote`. */
export interface QuoteRequest {
  projectDescription: string
  currency: Currency
  /** Optional - when left out the backend uses its default rate for the currency. */
  hourlyRate?: number
}

/** Shape returned by `POST /api/script/quote` (see `api/script/quote.ts`). */
export interface QuoteEstimate {
  currency: Currency
  hourlyRate: number
  hours: number
  total: number
  summary: string
}

/**
 * Asks the backend to estimate the hours and calculate the quote.
 * The route matches the serverless function `api/script/quote.ts`.
 */
export async function analyzeQuote(request: QuoteRequest): Promise<QuoteEstimate> {
  if (!API_READY) {
    throw new ApiError('The API layer is switched off (API_READY is false in src/api/client.ts).')
  }

  return postJson<QuoteEstimate>('/script/quote', request)
}
