import { useJoinRoomQuery, useLeaveRoomMutation } from '@/modules/main/actions'
import { ChatRoom } from '@/modules/main/components/chat-room'
import { CreateRoom } from '@/modules/main/components/create-room'
import { RoomLists } from '@/modules/main/components/room-lists'
import { AppShell, Button, Container, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [opened, { toggle }] = useDisclosure(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const leaveMutation = useLeaveRoomMutation()
  const joinMutation = useJoinRoomQuery()

  const handleJoinRoomClick = (value: string) => {
    setSelectedRoom(value)
    joinMutation.mutate({ roomId: value })
  }

  return (
    <AppShell withBorder={false} header={{ height: 64 }}>
      <AppShell.Header />

      <AppShell.Main>
        <Container size="sm" m="auto">
          <Flex gap="md" mb="md">
            {selectedRoom ? (
              <Button
                onClick={() => {
                  leaveMutation.mutate(selectedRoom)

                  setSelectedRoom(null)
                }}
              >
                Leave Room
              </Button>
            ) : (
              <Button onClick={toggle}>Create Room</Button>
            )}
          </Flex>

          {selectedRoom ? <ChatRoom roomId={selectedRoom} /> : <RoomLists onJoinClick={handleJoinRoomClick} />}
          <CreateRoom opened={opened} onClose={toggle} />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
