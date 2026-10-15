import { API_BASE_URL } from './apiConfig'
import { ApiError } from './ApiError'

export async function getJson<T>(path: string): Promise<T> {
  return request<T>(path)
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)
  if (!response.ok) {
    throw new ApiError(response.status, path)
  }
  return (await response.json()) as T
}
