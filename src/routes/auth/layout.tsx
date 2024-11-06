import { Container, Flex } from '@mantine/core'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    console.log('context.auth: ', context.auth)

    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function AuthLayout() {
  return (
    <Container maw={500} h="100vh">
      <Flex justify="center" align="center" h="100%">
        <Outlet />
      </Flex>
    </Container>
  )
}
