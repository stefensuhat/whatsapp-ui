import { useSendMessageMutation } from '@/modules/main/actions'
import { ActionIcon, Button, Container, FileButton, Flex, Textarea } from '@mantine/core'
import { IconUpload as Upload } from '@tabler/icons-react'
import { useRef, useState } from 'react'

export function MessageInput({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('')
  const resetRef = useRef<() => void>(null)

  const messageMutation = useSendMessageMutation(roomId)

  const handleSendClick = (e: any) => {
    e.preventDefault()

    if (message.trim() === '') {
      alert('Please enter a message!')
      return
    }

    messageMutation.mutate({ content: message })
    setMessage('')
  }

  const handleUploadClick = (e: any) => {
    const formData = new FormData()
    formData.append('attachment', e)
    formData.append('content', '')
    messageMutation.mutate(formData)

    resetRef.current?.()
  }

  return (
    <Container pos="fixed" bottom={10} w="100%">
      <Flex w="100%" justify="space-between" align="center" gap="md">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
          placeholder="Message..."
          flex={1}
        />

        <FileButton resetRef={resetRef} onChange={handleUploadClick} accept="image/png,image/jpeg">
          {(props) => (
            <ActionIcon {...props}>
              <Upload size={20} />
            </ActionIcon>
          )}
        </FileButton>

        <Button size="compact-md" onClick={handleSendClick}>
          Send
        </Button>
      </Flex>
    </Container>
  )
}
