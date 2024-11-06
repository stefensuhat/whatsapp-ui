import { DASHBOARD_ROUTES } from '@/lib/constants'
import http from '@/lib/http'
import { queries } from '@/lib/queries'
import { LoginResponse, MeResponse, loginFormSchema } from '@/modules/auth/types'
import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

export const loginMutation = () =>
  useMutation({
    mutationFn: async (values: loginFormSchema): Promise<LoginResponse> => {
      return await http.post('auth/login', values)
    },
    onSuccess: (data) => {
      Cookie.set('access-token', data.token)
      console.log('data: ', data)

      window.location.assign(DASHBOARD_ROUTES)
    },
  })

export const getMeQuery = ({ options = {} }: { options?: Omit<UseQueryOptions<any, any>, 'queryKey'> }) => {
  return useQuery({
    ...queries.auth.me,
    queryFn: async (): Promise<MeResponse> => {
      const { data } = await http.get('me')

      return data
    },
    ...options,
  })
}
