import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { authQueryKeys } from './auth'

export const queries = mergeQueryKeys(authQueryKeys)
