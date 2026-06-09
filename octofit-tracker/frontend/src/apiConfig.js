// VITE_CODESPACE_NAME must be set (e.g. in .env.local) when running inside a
// GitHub Codespace so the frontend can reach the backend at the correct URL.
// See .env.local.example for details.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : window.location.hostname.endsWith('.app.github.dev')
    ? `https://${window.location.hostname.replace('-5173.', '-8000.')}`
    : 'http://localhost:8000');

/**
 * Normalise both plain-array and paginated API responses to a plain array.
 * Supports: array, { results: [...] }, { data: [...] }
 */
export function normalizeItems(response) {
  if (Array.isArray(response)) return response;
  if (response && Array.isArray(response.results)) return response.results;
  if (response && Array.isArray(response.data)) return response.data;
  return [];
}
