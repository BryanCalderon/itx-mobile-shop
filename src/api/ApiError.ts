export class ApiError extends Error {
  readonly status: number

  constructor(status: number, path: string) {
    super(`Request to ${path} failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
  }
}
