import { index, rootRoute, route } from '@tanstack/virtual-file-routes'

export const routes = rootRoute('__root.tsx', [
  index('index.tsx'),
  route('/auth', 'auth/layout.tsx', [index('auth/index.tsx'), route('login', 'auth/login.tsx')]),
])
