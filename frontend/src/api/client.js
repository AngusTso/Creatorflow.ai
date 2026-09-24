/**
 * Shared HTTP helpers for the CreatorFlow AI backend.
 *
 * The backend (FastAPI + AI) is not connected yet, so every feature module in
 * `src/api/` throws an `ApiError` while `API_READY` is `false`. The fetch code
 * below is already real - it simply stays unused until the endpoints exist.
 */
/** Base path of the backend API. Swap this for the deployed API URL later. */
const API_BASE_URL = "/api";
/**
 * Switch this to `true` in the lesson that adds the backend endpoints.
 * While it is `false` the pages show a clear "API not implemented yet" error
 * instead of a confusing network error.
 */
export const API_READY = true;
/** Error thrown when a request fails, or when a feature has no backend yet. */
export class ApiError extends Error {
    /** HTTP status code, when the request reached the server. */
    status;
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}
/** Sends a JSON POST request and returns the parsed JSON response. */
export async function postJson(path, body) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    }
    catch {
        throw new ApiError("Could not reach the API. Is the backend running?");
    }
    if (!response.ok) {
        throw new ApiError(`The API answered with status ${response.status}.`, response.status);
    }
    return (await response.json());
}
