export interface PushResponse {
  readonly success: boolean
  readonly error?: string
  readonly code?: string
}
export interface Push {
  token: (token: string, customer?: string) => Promise<PushResponse>
  message: (title: string, body: string, data: object) => Promise<PushResponse>
}

export { push } from './api'
