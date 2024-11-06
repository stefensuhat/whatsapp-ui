import { AuthProvider } from '@/components/providers/auth-provider'
import { RoutingProvider } from '@/components/providers/routing-provider'
import { queryClient } from '@/lib/query'
import { theme } from '@/lib/themes'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './index.css'
import '@/lib/echo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RoutingProvider />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>,
)
