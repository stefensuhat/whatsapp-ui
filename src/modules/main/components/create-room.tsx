import { useCreateRoomMutation } from '@/modules/main/actions'
import { Button, Flex, Modal, NumberInput, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

export function CreateRoom({ onClose, opened }: { onClose: () => void; opened: boolean }) {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      max_members: 100,
    },
    validate: {
      name: isNotEmpty('Name is required'),
      description: isNotEmpty('Description is required'),
      max_members: isNotEmpty('Max Members is required'),
    },
  })

  const mutation = useCreateRoomMutation()

  const handleSubmit = (values: typeof form.values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Modal title="Create Room" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Name" placeholder="Room Name" key={form.key('name')} {...form.getInputProps('name')} />
          <TextInput
            label="Description"
            placeholder="Room Description"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          <NumberInput
            label="Max Members"
            placeholder="Max Members"
            hideControls
            key={form.key('max_members')}
            {...form.getInputProps('max_members')}
          />

          <Flex justify="end" gap="md">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
