/**
 * Shared HTTP helpers for the CreatorFlow AI backend.
 *
 * The backend lives in the `api/` folder at the repository root as Vercel
 * serverless functions, so every request goes to `/api/...`.
 */

/** Base path of the backend API. */
const API_BASE_URL = '/api'

/**
 * Master switch for the API layer. The endpoints in `api/script/` are live, so
 * this is `true`; set it to `false` to switch every call off (handy while
 * working offline). Features whose endpoint does not exist yet carry their own
 * switch - see `src/api/contract.ts`.
 */
export const API_READY = true

/** Error thrown when a request fails, or when a feature has no backend yet. */
export class ApiError extends Error {
  /** HTTP status code, when the request reached the server. */
  readonly status: number | undefined

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** Sends a JSON POST request and returns the parsed JSON response. */
export async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ApiError('Could not reach the API. Is the backend running?')
  }

  if (!response.ok) {
    // The serverless functions answer with { error: "..." } - show that text.
    const apiMessage = await readApiError(response)
    throw new ApiError(
      apiMessage ?? `The API answered with status ${response.status}.`,
      response.status,
    )
  }

  try {
    return (await response.json()) as TResponse
  } catch {
    throw new ApiError(
      'The API did not answer with JSON. The /api functions only run through Vercel, so use `vercel dev` when you test this locally.',
    )
  }
}

/** Reads the `{ error: "..." }` body that the API sends for failed requests. */
async function readApiError(response: Response): Promise<string | undefined> {
  try {
    const body: unknown = await response.json()

    if (typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string') {
      return body.error
    }
  } catch {
    // The body was empty or not JSON - fall back to the generic message.
  }

  return undefined
}
