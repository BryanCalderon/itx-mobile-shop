export const API_BASE_URL = requireApiBaseUrl()

function requireApiBaseUrl(): string {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined. Set it in the .env file.')
  }
  return apiBaseUrl
}
