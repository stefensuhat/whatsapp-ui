import { getMeQuery } from '@/modules/auth/actions'
import { AuthType } from '@/modules/auth/types'
import Cookie from 'js-cookie'
import { ReactNode, createContext, useContext } from 'react'

const Context = createContext<AuthType>({
  isAuthenticated: false,
  user: null,
  token: '',
})

export function AuthProvider(props: { children: ReactNode }) {
  const { data, isLoading } = getMeQuery({ options: { enabled: !!Cookie.get('access-token') } })

  if (isLoading) return <div>Verifying...</div>

  return <Context.Provider value={{ isAuthenticated: data ?? false, user: data }}>{props.children}</Context.Provider>
}

export const useAuth = () => useContext(Context)
