export type AuthType = {
  isAuthenticated: boolean
  token?: string
  user: Record<string, any> | null
}

export type LoginResponse = {
  token: string
  user: Record<string, any>
}

export type loginFormSchema = {
  username: string
  password: string
}

export type MeResponse = {
  username: string
}
