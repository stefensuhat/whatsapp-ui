import { useAuth } from '@/components/providers/auth-provider'
import { queryClient } from '@/lib/query'
import { routeTree } from '@/routeTree.gen'

// Set up a Router instance
import { RouterProvider, createRouter } from '@tanstack/react-router'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  context: {
    queryClient,
    auth: undefined!,
  },
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function RoutingProvider() {
  const { isAuthenticated, user } = useAuth()

  const contextAuth = {
    isAuthenticated: isAuthenticated,
    user: {
      name: user?.name,
      image: user?.image,
    },
  }

  return <RouterProvider router={router} context={{ auth: contextAuth, queryClient }} />
}
