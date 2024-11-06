import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: AuthIndex,
  beforeLoad: () => {
    throw redirect({
      to: '/auth/login',
    })
  },
})

function AuthIndex() {
  return <div>Auth Index</div>
}
