export interface CreateUserRequest {
  name: string
  login: string
  password: string
  role: string
  structureId: number
  incasatorId: number
  latitude?: string
  longitude?: string
}
