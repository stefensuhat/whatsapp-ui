import { AuthType } from '@/modules/auth/types'
import { AppShell } from '@mantine/core'
import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  auth: AuthType
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AppShell>
      <AppShell.Main>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </AppShell.Main>
    </AppShell>
  )
}
