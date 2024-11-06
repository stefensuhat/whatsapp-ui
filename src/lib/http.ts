import { LOGIN_ROUTES } from '@/lib/constants'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import { get, isEmpty } from 'lodash'

const baseURL = import.meta.env.VITE_API_URL

export interface ApiError extends Error {
  errors?: []
}

const fetch = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
  withXSRFToken: true,
})

fetch.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }

    const token = Cookie.get('access-token') || ''
    const getXsrfToken = Cookie.get('XSRF-TOKEN')

    newConfig.headers.withCredentials = true

    if (!isEmpty(token)) {
      newConfig.headers.authorization = `Bearer ${token}`
    }

    if ((config.method === 'post' || config.method === 'put' || config.method === 'delete') && !getXsrfToken) {
      return fetch
        .get('/sanctum/csrf-cookie')
        .then(() => {
          console.log('csrf: ', config)

          return config
        })
        .catch((error) => {
          console.log('setting response error: ', error)
          return config
        })
    }

    return config
  },
  (error) => Promise.reject(error),
)

fetch.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      Cookie.remove('access-token')

      window.location.assign(LOGIN_ROUTES)
    }

    return Promise.reject(get(error, 'response.data', 'Something went wrong!'))
  },
)

export default fetch
