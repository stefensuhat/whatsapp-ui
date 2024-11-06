import { loginMutation } from '@/modules/auth/actions'
import { loginFormSchema } from '@/modules/auth/types'
import { Button, Divider, Group, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  const form = useForm<loginFormSchema>({
    mode: 'uncontrolled',
    initialValues: { username: 'testuser', password: 'password' },
    validate: {
      username: isNotEmpty('Username is required'),
      password: isNotEmpty('Password is required'),
    },
  })

  const login = loginMutation()

  const handleSubmit = (values: typeof form.values) => {
    login.mutate(values)
  }

  return (
    <Paper radius="md" p="xl" withBorder w="100%">
      <Title order={3}>Welcome</Title>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Username"
            placeholder="hello@mantine.dev"
            {...form.getInputProps('username')}
            key={form.key('username')}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            key={form.key('password')}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button type="submit" color="accent" radius="xl" miw={120} loading={login.isPending}>
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
